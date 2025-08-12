//user login
function userLogin(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  if (authHeader === 'user') {
    console.log('admin logging successfull');
    next(); // adding next sayign that go to next flow instead of returing form here
  } else {
    // res.send() says to retun from here
    return res.status(403).json({ message: 'Token invalid' });
  }
}


// to admin login
function adminLogin(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  if (authHeader === 'admin') {
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
