const User = (req, res, next) => {
  if (req.user.role === 'USER') {
    return next()
  }
  return res.status(401).json({ msg: 'UnAuthorized' })
}

const Admin = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next()
  }
  return res.status(401).json({ msg: 'UnAuthorized' })
}

export { Admin, User }
