import user from '../models/user.js'
import User from '../app.js'

const users = [];
export const signUp = (req, res, next) => {
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

export const logIn = (req, res, next) => {
    
}

export const getAllUsers = (req, res, next) => {
   res
}
export const getOneUser = (req, res, next) => {
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
export const updateUser = (req, res, next) => {
    if (req.body.firstname && req.body.lastname) {
        db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {
                if (result[0] != undefined) {
                    db.query('SELECT * FROM users WHERE fistname = ? AND lastname = ? AND id != ?', [req.body.firstname, req.body.lastname, req.params.id], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            if (result[0] != undefined) {
                                res.json(error('Un compte est déjà créé avec ce nom et ce prénom'))
                            } else {
                                db.query('UPDATE users SET name = ? WHERE id = ?', [req.body.firstname, req.params.id], (err, result) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {
                                        res.json(success(true))
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

export const deleteUser = (req, res, next) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {
            if (result[0] != undefined) {
                db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
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