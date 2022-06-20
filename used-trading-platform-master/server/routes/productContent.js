const express = require('express');
const { Product, User } = require('../models/index');

const router = express.Router();

// 제품상세게시판
router.route('/:p_id').post(async (req, res, next) => {
  
  try {
    
    const products = await Product.findOne({
      include: [
        {
          model: User,
          attributes: ['nickname','id'],
        },
      ],
      where:{p_id : req.params.p_id},
      order: [['p_id', 'desc']],
    }
    );
    
    const result = [];
    result.push({
      p_id: products.p_id,
      descript: products.descript,
      regdate: products.regdate,
      price: products.price,
      cat_id: products.views,
      image: products.image,
      writer: products.User.id,
      nickname: products.User.nickname,
      title: products.title,
      reader:req.user,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const result = await Product.destroy({ where: { p_id: req.params.p_id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;
