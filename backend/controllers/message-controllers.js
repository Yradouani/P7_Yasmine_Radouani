
function success (result) {
    return {
        status: 'success',
        result: result
    }
}

function error (message) {
    return {
        status: 'error',
        message: message
    }
}

export const getAllMessages = (req, res, next) => {
   db.query('SELECT * FROM messages', (err, result) => {
       if (err) {
           res.json(error(err.message))
       } else {
           res.json(succes(result))
       }
   })
}
export const getMessagesFromSingleUser = (req, res, next) => {
   
}
export const createMessage = (req, res, next) => {
    res.status(201).json({
        message: 'Objet créé !'
      });
}
export const updateMessage = (req, res, next) => {
   
}
export const deleteMessage = (req, res, next) => {
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
export const likeMessage = (req, res, next) => {
   
}