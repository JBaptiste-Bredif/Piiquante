const Sauce = require('../models/model-sauce')
const fs = require('fs')

// GET 'api/sauces'
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => {
      if (sauce == null) {
        return res.status(404).json({ message: 'Sauce non trouvée' })
      }
      res.status(200).json(sauce)
    })
    .catch(error => res.status(404).json({ error: error }))
}

// GET 'api/sauces/:id'
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce == null) {
        return res.status(404).json({ message: 'Sauce non trouvée' })
      }
      res.status(200).json(sauce)
    })
    .catch(error => res.status(404).json({ error: error }))
}

// POST 'api/sauces' 
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error, message: 'Sauce non enregistrée !' }))
}

// PUT 'api/sauces/:id'
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }

      if (req.file) {
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }))
        })
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => res.status(404).json({ error }))
}

// DELETE 'api/sauces/:id'
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error: error }))
      })
    })
    .catch(error => res.status(404).json({ error }))
}

// POST 'api/sauces/:id/like'
exports.likeDislikeSauce = (req, res, next) => {
  const dataPossible = [1, 0, -1]
  if (dataPossible.includes(req.body.like)) {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        // Si 0, celà veut dire que le user avait déjà like ou dislike cette sauce, donc il doit être présent dans une array
        if (req.body.like === 0) {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
              .then(() => { res.status(200).json({ message: 'Like supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
              .then(() => { res.status(200).json({ message: 'Dislike supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
          } else {
            res.status(403).send({ error: 'Unauthorized Value' })
          }
          // Si 1 ou -1, celà veut dire que le user n'avait jamais like ou dislike cette sauce, donc il doit être absent des deux array
        } else if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {
          if (req.body.like === 1) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
              .then(() => res.status(200).json({ message: 'Like ajouté !' }))
              .catch(error => res.status(400).json({ error }))
          } else if (req.body.like === -1) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
              .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
              .catch(error => res.status(400).json({ error }))
          } else {
            res.status(403).send({ error: 'Unauthorized Value' })
          }
        } else {
          res.status(403).send({ error: 'Unauthorized Value' })
        }
      })
      .catch(error => res.status(404).json({ error }))
  } else {
    res.status(403).send({ error: 'Unauthorized Value' })
  }
}