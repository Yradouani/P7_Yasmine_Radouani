const { Message } = require ('../sequelize.js')
const fs = require ('fs')

exports.getAllMessages = (req, res, next) => {
//    db.query('SELECT * FROM messages', (err, result) => {
//        if (err) {
//            res.json(error(err.message))
//        } else {
//            res.json(succes(result))
//        }
//    })
console.log(Message);
    Message.findAll()
        .then(allMessages => res.status(200).json(allMessages))
        .catch(error => res.status(400).json({ error }));
}
exports.getMessagesFromSingleUser = (req, res, next) => {
   
}
exports.createMessage = (req, res, next) => {
    const message = new Message({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: req.body.imageUrl,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.content,
        userId: req.body.userId
      });

    message.save()
      .then(response => {
          const message = 'Message enregistré !'
          res.status(201).json({ message, response})
      })
      .catch(error => res.status(400).json({ error }));
    // Message.create(req.body)
    //     .then(message => {
    //         const note = `Votre message a bien été créé.`
    //         res.status(200).json(message, note)
    //     })
    //     .catch(error => res.status(400).json({ error }));
}
exports.updateMessage = (req, res, next) => {
   const id = req.params.id
   Message.update(req.body, {
       where: { id: id }
   })
   .then(_ => {
       Message.findByPk(id)
        .then(response => {
            const message = 'Message modifié !'
            res.status(201).json({ message, response})
        })
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}

exports.deleteMessage = (req, res, next) => {
    Message.findByPk({ id: req.params.id })
    .then(message => {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Message.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(400).json({ error }))
    // db.query('SELECT * FROM messages WHERE id = ?', [req.params.id], (err, result) => {
    //     if (err) {
    //         res.json(error(err.message))
    //     } else {
    //         if (result[0] != undefined) {
    //             db.query('DELETE FROM messages WHERE id = ?', [req.params.id], (err, result) => {
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
}
exports.likeMessage = (req, res, next) => {
   
}