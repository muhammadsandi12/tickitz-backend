const jwt = require('jsonwebtoken')

module.exports ={

    isLogin: (req, res, next) => {
        if(!req.headers.authorization){
            return res.status(401).send({message: "Unauthorized User, Token Required"})
        }
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function (err, result) {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Access Forbidden' })
                }
                req.decodeToken = result
                next()
            })
        } else {
            return res.status(403).json({ success: false, message: 'Please Login' })
        }
    },
    isAdmin: (req, res, next) => {
        if (req.decodeToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access Forbidden, Only admin can do this feature!' })
        }
        next()
    },
    isUser: (req, res, next) => {
        if (req.decodeToken.role !== 'user') {
            return res.status(403).json({ success: false, message: 'Access Forbidden' })
        }
        next()
    },
}