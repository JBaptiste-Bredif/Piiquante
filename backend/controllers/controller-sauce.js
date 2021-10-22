const Sauce = require('../models/model-sauce');

// GET 'api/sauces'
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error: error }))
}


// POST 'api/sauces' 
exports.createSauce = (req, res, next) => {
    // console.log(req)
    // console.log(req.sauces)
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error, message: ' Non upload ' }))
}

// GET 'api/sauces/:id'
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))
}
