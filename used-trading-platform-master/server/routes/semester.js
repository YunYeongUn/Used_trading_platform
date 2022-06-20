const express = require('express');
const { Jap_reply, User } = require('../models/index');

const router = express.Router();

// GET
router.get('/', async (req, res, next) => {
  try {
    const replies = await Jap_reply.findAll({
      attributes: ['reply_id', 'writer', 'regdate', 'content'],
      include: [
        {
          model: User,
          attributes: ['user_id', 'nickname'],
        },
      ],
      order: [['reply_id', 'desc']],
    });
    const result = [];
    for (const reply of replies) {
      result.push({
        reply_id: reply.reply_id,
        writer: reply.writer,
        user_id: reply.User.user_id,
        nickname: reply.User.nickname,
        regdate: reply.regdate,
        content: reply.content,
      });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/create', async (req, res, next) => {
  try {
    await Jap_reply.create({
      // id는 자동 생성
      writer: req.user,
      content: req.body.content,
      // regdate는 자동생성
    });
    return res.send('작성 완료!');
  } catch (err) {
    next(err);
  }
});

// PATCH
router.put('/update', async (req, res, next) => {
  try {
    await Jap_reply.update(
      { content: req.body.content },
      { where: { reply_id: req.body.reply_id } }
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
    await Jap_reply.destroy({
      where: { reply_id: req.query.reply_id },
    });
    return res.send('삭제 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.update;

module.exports = router;
