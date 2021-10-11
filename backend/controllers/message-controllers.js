const { Message } = require ('../sequelize.js')

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
    Message.create(req.body)
        .then(message => {
            const note = `L'utilisateur ${req.body.firstname} ${req.body.lastname} a bien été créé.`
            res.status(200).json(message, note)
        })
        .catch(error => res.status(400).json({ error }));
}
exports.updateMessage = (req, res, next) => {
   
}
exports.deleteMessage = (req, res, next) => {
    db.query('SELECT * FROM messages WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {
            if (result[0] != undefined) {
                db.query('DELETE FROM messages WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(true))
                    }
                })
            } else {
                res.json(error('Wrong id'))
            }

        }
    })
}
exports.likeMessage = (req, res, next) => {
   
}