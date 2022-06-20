const express = require('express');
const { Board, User } = require('../models/index');

const router = express.Router();

// 상세게시판
router.route('/:post_id').post(async (req, res, next) => {
  try {
    
    const posts = await Board.findOne({
      include: [
        {
          model: User,
          attributes: ['nickname','id'],
        },
      ],
      where:{post_id : req.params.post_id},
      order: [['post_id', 'desc']],
    });
    const updatedView = posts.views+1;

    const d = await Board.update({
      views: updatedView,
    }, {
      where: { post_id: req.params.post_id },
    });

    const result = [];
    result.push({
      post_id: posts.post_id,
      content: posts.content,
      regdate: posts.regdate,
      title: posts.title,
      views: posts.views,
      recommends: posts.recommends,
      writer: posts.User.id,
      nickname: posts.User.nickname,
      reader:req.user,
    });
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const result = await Board.destroy({ where: { post_id: req.params.post_id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
})
.patch(async (req, res, next) => {
  try {
    const posts = await Board.findOne({
      include: [
        {
          model: User,
          attributes: ['nickname','id'],
        },
      ],
      where:{post_id : req.params.post_id},
      order: [['post_id', 'desc']],
    });

    const updatedR = posts.recommends+1;
    await Board.update({
      recommends: updatedR,
    }, {
      where: { post_id: req.params.post_id },
    });
    
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;
