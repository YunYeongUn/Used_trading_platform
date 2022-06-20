const express = require('express');
const multer = require('multer');
const { Team_member } = require('../models/index');

const router = express.Router();

// multer 옵션
// hdd에 저장
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

// GET
router.get('/', async (req, res, next) => {
  try {
    const members = await Team_member.findAll({});
    const result = [];
    for (const m of members) {
      result.push({
        mb_id: m.mb_id,
        name: m.name,
        image: m.image,
        mb_tell: m.mb_tell.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        introduction: m.introduction,
      });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST
router.post('/create', upload.single('image'), async (req, res, next) => {
  try {
    const { name, mb_tell, introduction } = req.body;
    const image = `http://localhost:5000/img/${req.file.filename}`;
    await Team_member.create({
      // mb_id 자동 생성
      name,
      mb_tell,
      image: image,
      introduction,
    });
    return res.status(201).send('추가 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// PUT
router.put('/update', upload.single('image'), async (req, res, next) => {
  try {
    const { name, mb_tell, introduction } = req.body;
    const image = `http://localhost:5000/img/${req.file.filename}`;
    await Team_member.update(
      {
        // mb_id 자동 생성
        name,
        mb_tell,
        image: image,
        introduction,
      },
      {
        where: { mb_id: req.body.mb_id },
      }
    );
    return res.send('수정 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    await Team_member.destroy({
      where: { mb_id: req.query.mb_id },
    });
    return res.send('삭제 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
