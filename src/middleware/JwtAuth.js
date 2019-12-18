const AuthService = require("../routes/login/AuthService");

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''
  console.log(authToken)
  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    console.log(payload)
    AuthService.getUser(
      req.app.get('db'),
      payload.sub,
    )
      .then(user => {
        console.log(user)
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' })

        req.user = user[0];
        next()
      })
      .catch(err => {
        console.error(err)
        next(err)
      })
  } catch(error) {
    res.status(401).json({ error: 'Unauthorized request' })
  }
}

module.exports = {
  requireAuth,
}
