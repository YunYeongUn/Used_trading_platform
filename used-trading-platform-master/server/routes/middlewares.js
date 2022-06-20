module.exports = {
  // 내가 지금 로그인 했는가
  isLoggedIn(req, res, next) {
    // isAuthenticated -> passport에서 제공하는 함수로 로그인 되어 있는지 아닌지를 true, false로 return함
    // res.isAuthenticated() 가 true면 로그인 되어 잇는거임
    if (req.isAuthenticated()) {
      next(); // 다음 미들웨어
    } else {
      //401(Unauthorized)는 대상 리소스에 대한 유효한 인증 자격 증명이 부족하여 요청이 적용되지 않았음을 의미
      return res.status(401).send('로그인이 필요합니다.');
    }
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      next();
    } else {
      return res.status(401).send('로그아웃 후 접근이 가능합니다.');
    }
  },
};
