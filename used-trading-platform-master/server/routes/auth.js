const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

// 회원가입
// POST /register 요청시 isNotLoggedIn 함수 호출 후 오류 없으면 콜백실행
router.post('/register', isNotLoggedIn, async (req, res) => {
  try {
    const { user_id, name, password, nickname, addr, phone_num } = req.body;

    const exUserId = await User.findOne({
      // 아이디 검사
      where: {
        user_id: user_id,
      },
    });
    const exNickname = await User.findOne({
      // 닉네임 검사
      where: {
        nickname: nickname,
      },
    });
    if (exUserId) {
      // 아이디 검사 후 아이디가 기존에 있다면?
      // return으로 res(응답)을 한번만 보내도록 한다. 응답 후 router 종료된다.
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    if (exNickname) {
      // 닉네임 검사 후 닉네임이 기존에 있다면?
      return res.status(403).send('이미 사용중인 닉네임입니다.');
    }

    // bcrypt - 비밀번호 해쉬화하기
    const hash = await bcrypt.hash(password, 12);

    // User 테이블에 신규 유저 생성하기
    await User.create({
      user_id,
      password: hash,
      name,
      nickname,
      addr,
      phone_num,
    });

    // 요청에 대한 성공으로 status(201) : 생성이 됐다는 의미 (기재하는게 좋다.)
    return res.status(201).send('회원가입이 정상적으로 처리되었습니다.');
  } catch (err) {
    next(err);
  }
});

// 로그인
// 미들웨어 확장법 (req, res, next를 사용하기 위해서)
// passport index.js에서 전달되는 done의 세가지 인자를 받는다.
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // 여기서 local를 실행한다.
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // 서버 에러
      console.error(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러 (비밀번호가 틀렸거나, 계정이 없거나), info.reason에 에러 내용이 있음.
      return res.status(403).send(info.reason);
    }
    // 아래는 마지막으로 에러를 검사하는 코드다.
    // 성공하면 passport의 serialize가 실행된다.
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).send(`${req.user.nickname}님 반갑습니다`);
    });
  })(req, res, next); // 미들웨어 확장에서는 끝에 항상 넣어줘야한다.
});

// 로그아웃
// POST /logout
router.post('/logout', isLoggedIn, (req, res, next) => {
  // passport 모듈 0.6.0부터 req.logout()이 아닌 밑에처럼 해줘야함
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  // });
  try {
    req.user = null;
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(200).send('로그아웃이 정상적으로 처리되었습니다.');
  } catch (error) {
    next(error);
  }
});

router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.status(200).json({ id: req.user });
  }
  return res.json({ id: '' });
});

module.exports = router;
