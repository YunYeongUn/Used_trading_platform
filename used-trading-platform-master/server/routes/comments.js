const express = require('express');
const { User, Board_reply } = require('../models/index');

const router = express.Router();

// 자유게시판댓글
router.route('/:post_id').post(async (req, res, next) => {
  try {
    const replies = await Board_reply.findAll({
      attributes: {
        exclude: ['writer'],
      },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      where:{p_id : req.params.post_id},
      order: [['regdate']],
    });
    const result = [];
    for (const reply of replies) {
      result.push({
        reply_id: reply.reply_id,
        content: reply.reply_content,
        regdate: reply.regdate,
        p_id: reply.p_id,
        nickname: reply.User.nickname,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/write/:post_id').post(async (req, res, next) => {
  try {
    await Board_reply.create({
      reply_content: req.body.content,
      writer: req.user,
      p_id: req.params.post_id,
    });
    return res.status(201).send('댓글 등록 완료!');
  } catch (err) {
    next(err);
  }
});


module.exports = router;
