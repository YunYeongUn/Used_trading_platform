const express = require('express');
const { Product, User, Category } = require('../models/index');
const multer = require('multer');
const { Op } = require('sequelize');

const router = express.Router();

// multer 옵션
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 저장위치 설정
    //req: 요청정보  file : 업로드 파일 정보, cb: 업로드 설정완료시 호출
    // public 폴더에 저장
    cb(null, 'public/');
  },
  filename(req, file, cb) {
    // 저장시 파일명 Date.now()_파일이름
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

// 미들웨어
// 파일명을 보기 쉽게해서 관리하기 쉽게함
const upload = multer({
  storage: storage,
  // 용량제한 10mb
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get('/product', async (req, res, next) => {
  try {
    const catId = req.query.cat_id;
    let searchWord = req.query.state;
    if (!searchWord) {
      searchWord = '';
    }
    let products;
    if (catId) {
      products = await Product.findAll({
        attributes: {
          exclude: ['writer'],
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        where: {
          cat_id: catId,
        },
        order: [['p_id', 'desc']],
      });
    } else {
      products = await Product.findAll({
        attributes: {
          exclude: ['writer'],
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        where: {
          title: {
            [Op.like]: '%' + searchWord + '%',
          },
        },
        order: [['p_id', 'desc']],
      });
    }

    const result = [];
    for (const p of products) {
      result.push({
        p_id: p.p_id,
        descript: p.descript,
        price: p.price,
        regdate: p.regdate,
        image: p.image,
        title: p.title,
        nickname: p.User.nickname,
        cat_id: p.cat_id,
      });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/category', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['cat_id']],
    });
    const result = [];
    for (const c of categories) {
      result.push({
        cat_id: c.cat_id,
        cat_name: c.cat_name,
        cat_desc: c.cat_desc,
      });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/create', upload.single('image'), async (req, res, next) => {
  try {
    const { title, cat_id, price, descript } = req.body;
    if (req.user) {
      await Product.create({
        title,
        cat_id,
        price,
        descript,
        image: 'http://localhost:5000/img/' + req.file.filename,
        writer: req.user,
        // p_id 자동
      });
      return res.json({ msg: '게시글이 작성되었습니다.' });
    } else {
      return res.json({ msg: '로그인 후 이용해주세요' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
