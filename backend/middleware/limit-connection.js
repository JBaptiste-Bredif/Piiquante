const rateLimit = require("express-rate-limit")

exports.connection = (numberLimitConnections) => {
	const limiter = rateLimit({
		windowMs: 5 * 60 * 1000,
		max: numberLimitConnections,
		message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
	})
	return limiter
}