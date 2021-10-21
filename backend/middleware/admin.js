const administrator = (req, res, next) => {
  try {
    if (req.body.userId && req.body.isAdmin !== 1) {
      console.log("Vous n'êtes pas identifié ni administrateur")
      throw 'Not administrator';
      
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

module.exports = administrator;