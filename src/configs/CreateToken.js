const jwt = require('jsonwebtoken')

//!Create Token
exports.CreateToken = async (email, user_id, role, expires) => {
    return jwt.sign(
        { email: email, id: user_id, role: role }, process.env.JWT_KEY, { expiresIn: expires })
}