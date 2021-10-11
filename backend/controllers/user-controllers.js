const user = require ('../models/user.js')
const { User } = require ('../sequelize.js')

const users = [];
exports.signUp = (req, res, next) => {
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

exports.logIn = (req, res, next) => {
    
}

exports.getAllUsers = (req, res, next) => {
   res
}
exports.getOneUser = (req, res, next) => {
    // db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    //     if (err) {
    //         res.json(error(err.message))
    //     } else {
    //         if (result[0] != undefined) {
    //             res.json(succes(result))
    //         } else {
    //             res.json(error('Wrong id'))
    //         }

    //     }
    // })
    User.findByPk({_id : req.params.id})
    .then(user => {
        const message = 'Utilisateur trouvé'
        res.status(200).json({user, message})
    })
    
    .catch(error => res.status(404).json({ error }))
}
exports.updateUser = (req, res, next) => {
    const id = req.params.id
    User.update(req.body, {
       where: { id: id }
   })
   .then(_ => {
       User.findByPk(id)
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
    User.findByPk({ id: req.params.id })
    .then(user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } })
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

