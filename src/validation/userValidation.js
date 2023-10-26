const { ValidationError } = require('custom-error-handlers/error');

exports.userValidation = (username, email, password, confirmPassword) => {
    if (!username) {
        throw new ValidationError('Username is required');
    }
    if (!email) {
        throw new ValidationError('Email is required');
    }
    if (!password) {
        throw new ValidationError('Password is required');
    }
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required');
    }
    if (password !== confirmPassword) {
        throw new ValidationError('Password and Confirm Password must be the same')
    }

}