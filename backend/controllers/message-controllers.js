const { Message } = require ('../sequelize.js')
const fs = require ('fs')

exports.getAllMessages = (req, res, next) => {
    console.log(Message);
        Message.findAll()
            .then(allMessages => res.status(200).json(allMessages))
            .catch(error => res.status(400).json({ error }));
}
exports.getMessagesFromSingleUser = (req, res, next) => {
    Message.findByPk({userId : req.params.userId})
    .then(user => {
        const message = `Voici les messages de l'utilisateur`
        res.status(200).json({user, message})
    })
    
    .catch(error => res.status(404).json({ error }))
}

exports.createMessage = (req, res, next) => {
    console.log(req.file)
    let message
    if(req.file){
        message = new Message({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.content,
        userId: req.body.userId,
        imageProfil: req.body.imageProfil
        });
    } else {
        message = new Message({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            content: req.body.content,
            userId: req.body.userId,
            imageProfil: req.body.imageProfil
            });
    }

    message.save()
      .then(response => {
          const message = 'Message enregistré !'
          res.status(201).json({ message, response})
      })
      .catch(error => res.status(400).json({ error }));
}
exports.updateMessage = (req, res, next) => {
    // const messageObject = req.file ?
    // {
    //   ...JSON.parse(req.body.message),
    //   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // } : { ...req.body };
    
    // Message.update({ where: {id: req.params.id} }, { ...messageObject, id: req.params.id })
    // .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    // .catch(error => res.status(400).json({ error }));

    // ------------------------------------------
    // let message
    // if(req.file){
    //         message = new Message({
    //             firstname: req.body.firstname,
    //             lastname: req.body.lastname,
    //             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //             content: req.body.content,
    //             userId: req.body.userId,
    //             imageProfil: req.body.imageProfil
    //         })
    //     } else {
    //         message = new Message({
    //             firstname: req.body.firstname,
    //             lastname: req.body.lastname,
    //             content: req.body.content,
    //             userId: req.body.userId,
    //             imageProfil: req.body.imageProfil
    //         })
    //     }
    // console.log(req.file)
    //     console.log(message.imageUrl)
    //     const id = req.params.id
    //     Message.update(req.body, {where: { id: id }})
    //     .then(_ => {
    //         Message.findByPk(id)
    //             .then(response => {
    //                 const message = 'Message modifié !'
    //                 res.status(201).json({ message, response})
    //             })
    //             .catch(error => res.status(400).json({ error }))
    //         })
    //         .catch(error => res.status(400).json({ error }))

    // -------------------------------------------------
    if(req.file){
            Message.update({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            content: req.body.content,
                            userId: req.body.userId,
                            imageProfil: req.body.imageProfil
                        }, {where: { id: req.params.id }}
            )
        .then(response => {
            const message = 'Message modifié !'
            res.status(201).json({ message, response})
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        Message.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            content: req.body.content,
            userId: req.body.userId,
            imageProfil: req.body.imageProfil}, {where: { id: req.params.id }})
                .then(response => {
                const message = 'Message modifié !'
                res.status(201).json({ message, response})
                })
                .catch(error => res.status(400).json({ error }))
        }
    // -----------------------------------------------------
}

exports.deleteMessage = (req, res, next) => {
    Message.findOne({where : { id: req.params.id }})
    .then(message => {
        if(message.imageUrl){
            const filename = message.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Message.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        } else {
            Message.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
        }
      
    })
    .catch(error => res.status(400).json({ error }))

    // Message.destroy({where : { id: req.params.id }})
    //     .then(() => res.status(200).json({ message: 'Message supprimé !'}))
    //     .catch(error => res.status(400).json({ error }));
}
exports.likeMessage = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;

    if(like == 1){
        Message.update({ 
            $inc: {like: + 1},
            $push: {usersLike: userId}
        }, {where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Vous aimez ce message' }))
            .catch(error => res.status(400).json({ error }));
    } else {
        Message.findOne({where : { id: req.params.id }})
            .then(message => {
                if (message.usersLike.includes(userId)) {
                    Message.update({ 
                        $inc: { likes: -1 },
                        $pull: { usersLike: userId }
                    }, {where : { id: req.params.id }})
                        .then(() => res.status(200).json({ message: 'Vous avez annulé votre choix' }))
                        .catch(error => res.status(400).json({ error }));
                } 
            })
            .catch(error => res.status(404).json({ error }));
    } 
    // .then(function(array){
    //     var newArr = [];
    //     array.forEach(function(elem){
    //         newArr.push(fn(elem);
    //     }
    //     return newArr;
    //  });
}