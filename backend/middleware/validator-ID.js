const ObjectId = require('mongoose').Types.ObjectId

exports.checkParam = (req, res, next) => {
    const id = req.params.id
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) {
            next()
        } else {
            res.status(403).json({ error: 'Unauthorized Value !' })
        }
    } else {
        res.status(403).json({ error: 'Unauthorized Value !' })
    }
}