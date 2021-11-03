const { Like, Message, User } = require ('../sequelize.js')

exports.likeMessages = (req, res, next) => {
    console.log(Message);
        Message.findOne({where : { id: req.params.id }})
            .then((message) => {
                if(!message) {
                    return res.status(400).json({ error : 'Message introuvable'})
                } else if (req.body.like){
                    Like.create({userId: req.body.userId, id: req.params.id})
                        .then((like) => {
                            Message.update({ likes: message.likes +1 }, {where: { id: req.params.id }})
                                    .then((message) => res.status(200).json({message : 'Vous aimez ce message'}))
                                    .catch((error) => res.status(400).json({ error }))
                        })
                        .catch((error) => res.status(400).json({ error }))
                } else {
                    Like.destroy({where: {userId: req.body.userId, id: req.params.id}})
                        .then((like) => {
                            Message
                                .update({ likes: message.likes -1 }, {where: { id: req.params.id }})
                                    .then((message) => res.status(200).json({message : "Vous n'aimez plus ce message"}))
                                    .catch((error) => res.status(400).json({ error }))
                        })
                        .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }));
}
//Récupérer les likes d'un message
exports.getLikeOfOneMessage = (req, res, next) => {
    Like.findAll({ where: {id: req.params.id} })
        .then((message) => res.status(200).json({message}))
        .catch((error) => res.status(400).json({ error }))
};
//
exports.isLiked = (req, res, next) => {
    Like.findOne({where: {userId: req.params.userId, id: req.params.id}})
        .then((message) => res.status(200).json({message}))
        .catch((error) => res.status(400).json({ error }))
};
exports.getAllLikesOfOneUser = (req, res, next) => {
    Like.findAll({where: {userId: req.body.userId}})
        .then((message) => res.status(200).json({message}))
        .catch((error) => res.status(400).json({ error }))
}