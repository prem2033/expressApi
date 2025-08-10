const jwt = require('jsonwebtoken');

function userLogin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1] ?? 'user';

  if (!token) return res.status(401).json({ message: 'Token missing' });

  if (token === 'user') {
    console.log('admin logging successfull');
    next();
  } else {
    return res.status(403).json({ message: 'Token invalid' });
  }
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ message: 'Token invalid' });

  //   req.user = user;
  //   next(); // to head to next process
  //   // res.send("sucess") // it will return from here
  // });
}


// to admin login
export function adminLogin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1] ?? 'admin';

  if (!token) return res.status(401).json({ message: 'Token missing' });

  if (token === 'admin') {
    console.log('admin logging successfull');
    next();
  } else {
    return res.status(403).json({ message: 'Token invalid' });
  }
}

module.exports = {
  userLogin,
  adminLogin
};
