const User = require('../models/model-user');

// '/api/auth/signup'
exports.signup = (req, res, next) => {
    // delete req.body._id;
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// '/api/auth/login'
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            } else {
                if (req.body.password != user.password) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' })
                } else {
                    return res.status(200).json({
                        userId: user._id,
                        token: 'test'
                    })
                }
            }
        })
        .catch(error => res.status(500).json({ error }))
};

