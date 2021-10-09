
const users = [];
export const signUp = (req, res, next) => {
    db.query('SELECT * FROM users WHERE firstname = ?', [req.body.name], (err, result) => {
        
    })
    if (req.body.name) {
        let member = {
            name: req.body.name,
        }
        users.push(member)
        res.json(success(member))
    } else {
        res.json(error())
    }
}
export const logIn = (req, res, next) => {
    
}

export const getAllUsers = (req, res, next) => {
   res
}
export const deleteUser = (req, res, next) => {
    
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