const { User } = require ('../sequelize.js')
const fs = require ('fs')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const dotenv = require ('dotenv')
dotenv.config()
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*\d).{4,8}$/;

// Création d'un compte utilisateur
exports.signUp = (req, res, next) => {
  if(req.body.email == null || req.body.password == null || req.body.firstname == null || req.body.lastname == null){
    return res.status(400).json({ 'error': 'missing parameters' });
  }
  if (req.body.firstname.length > 20 || req.body.firstname.length < 3) {
    return res.status(400).json({ 'error': 'wrong firstname (length must be between 3-20 characters' });
  }
  if (req.body.lastname.length > 20 || req.body.lastname.length < 3) {
    return res.status(400).json({ 'error': 'wrong lastname (length must be between 3-20 characters' });
  }
  if(!emailRegex.test(req.body.email)){
    return res.status(400).json({ 'error': 'email invalid' });
  }
  if(!passwordRegex.test(req.body.password)){
    return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 characters include 1 letter)' });
  }

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log('En cours de création nouvel utilisateur')
      console.log(req.file)
      let user;
      if(req.file){
        user = new User({
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname, 
          imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          isAdmin: 0
        });
      } else {
        user = new User({
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          imageProfil: `${req.protocol}://${req.get('host')}/images/not_picture.jpg`,
        });
      }
      
      console.log(user)
      user.save()
        .then(response => {
            const message = 'Utilisateur créé !'
            res.status(201).json({ message, response})
        })
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
  }

// Connection au compte utilisateur
exports.logIn = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.userId,
            token: jwt.sign(
                { userId: user.userId,
                  isAdmin: user.isAdmin
                },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}
// exports.userInfos = (req, res, next) => {
//   const user = new Message({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     imageUrl: req.body.imageUrl,
//     content: req.body.content,
//     userId: req.body.userId
//   });

// message.save()
//   .then(response => {
//       const message = 'Message enregistré !'
//       res.status(201).json({ message, response})
//   })
//   .catch(error => res.status(400).json({ error }));
// }

exports.getAllUsers = (req, res, next) => {
  User.findAll()
  .then(allUsers => res.status(200).json(allUsers))
  .catch(error => res.status(400).json({ error }));
}

// 
exports.getOneUser = (req, res, next) => {
    User.findOne( {where: {userId : req.params.userId}})
        .then(user => {
            const message = 'Utilisateur trouvé'
            res.status(200).json({user, message})
        })
        .catch(error => res.status(404).json({ error }))
}
exports.updateUser = (req, res, next) => {
    User.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                }, {where: { userId: req.params.userId }}
    )
      .then(response => {
          const message = 'Utilisateur modifié !'
          res.status(201).json({ message, response})
          return response
      })
      .catch(error => res.status(400).json({ error }))
  //   const userId = req.params.userId
  //   User.update(req.body, {
  //      where: { userId: userId }
  //  })
  //  .then(_ => {
  //      User.findOne(userId)
  //       .then(response => {
  //           const message = 'Utilisateur modifié !'
  //           res.status(201).json({ message, response})
  //       })
  //       .catch(error => res.status(400).json({ error }))
  //   })
  //   .catch(error => res.status(400).json({ error }))
}

exports.deleteUser = (req, res, next) => {
    User.findOne({where: { userId: req.params.userId }})
    .then(user => {
      // if(user.imageProfil){
      //   const filename = user.imageProfil.split('/images/')[1];
      //   fs.unlink(`images/${filename}`, () => {
      //       User.destroy({ where: { userId: req.params.userId } })
      //           .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
      //           .catch(error => res.status(400).json({ error }));
      //   });
      // } else {
        User.destroy({ where: { userId: req.params.userId } })
                .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
                .catch(error => res.status(400).json({ error }));
    // }
    })
    .catch(error => res.status(400).json({ error }))
}

    // db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    //     if (err) {
    //         res.json(error(err.message))
    //     } else {
    //         if (result[0] != undefined) {
    //             db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    //                 if (err) {
    //                     res.json(error(err.message))
    //                 } else {
    //                     res.json(success(true))
    //                 }
    //             })
    //         } else {
    //             res.json(error('Wrong id'))
    //         }

    //     }
    // })

