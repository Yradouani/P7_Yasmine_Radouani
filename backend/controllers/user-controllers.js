const { User } = require ('../sequelize.js')
const fs = require ('fs')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const dotenv = require ('dotenv')
dotenv.config()

// Création d'un compte utilisateur
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log('En cours de création nouvel utilisateur')
      console.log(req.file)
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      });
      console.log(user)
      user.save()
        .then(response => {
            const message = 'Utilisateur créé !'
            res.status(201).json({ message, response})
        })
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
    // db.query('INSERT INTO users(firstname) VALUES ? AND', [req.body.firstname], (err, result) => {
    //     if (err) {
    //         res.json(error(err.message))
    //     } else {
    //         db.query('SELECT * FROM users WHERE firstname = ?', [req.body.firstname], (err, result) => {
    //             if (err) {
    //                 res.json(error(err.message))
    //             } else {
    //                 res.json({
    //                     id: result[0].id,
    //                     firstname: result[0].firstname
    //                 })
    //             }
    //         })
    //     }
    // })
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
                { userId: user.userId },
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
    const userId = req.params.userId
    User.update(req.body, {
       where: { userId: userId }
   })
   .then(_ => {
       User.findOne(userId)
        .then(response => {
            const message = 'Utilisateur modifié !'
            res.status(201).json({ message, response})
        })
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
    // if (req.body.firstname && req.body.lastname) {
    //     db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    //         if (err) {
    //             res.json(error(err.message))
    //         } else {
    //             if (result[0] != undefined) {
    //                 db.query('SELECT * FROM users WHERE fistname = ? AND lastname = ? AND id != ?', [req.body.firstname, req.body.lastname, req.params.id], (err, result) => {
    //                     if (err) {
    //                         res.json(error(err.message))
    //                     } else {
    //                         if (result[0] != undefined) {
    //                             res.json(error('Un compte est déjà créé avec ce nom et ce prénom'))
    //                         } else {
    //                             db.query('UPDATE users SET name = ? WHERE id = ?', [req.body.firstname, req.params.id], (err, result) => {
    //                                 if (err) {
    //                                     res.json(error(err.message))
    //                                 } else {
    //                                     res.json(success(true))
    //                                 }
    //                             })
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // }
}

exports.deleteUser = (req, res, next) => {
    User.findByPk({ userId: req.params.userId })
    .then(user => {
      const filename = user.imageProfil.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { userId: req.params.userId } })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      });
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

