const express = require('express');
const { User, Product_reply } = require('../models/index');

const router = express.Router();

// 제품댓글
router.route('/:p_id').post(async (req, res, next) => {
  try {
    const replies = await Product_reply.findAll({
      attributes: {
        exclude: ['writer'],
      },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      where:{p_id : req.params.p_id},
      order: [['regdate', 'desc']],
    });
    const result = [];
    for (const reply of replies) {
      result.push({
        reply_id: reply.reply_id,
        reply_content: reply.reply_content,
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

router.route('/write/:p_id').post(async (req, res, next) => {
  try {
    await Product_reply.create({
      reply_content: req.body.content,
      writer: req.user,
      p_id: req.params.p_id,
    });

    return res.status(201).send('댓글 등록 완료!');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
