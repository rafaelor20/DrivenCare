// middleware/authenticateDoctor.js


export async function  authenticateDoctor(req, res, next) {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(422).json({ message: 'Email and password must be strings' });
    }

    res.locals.email = email;
    res.locals.password = password;
  
    next();
}


