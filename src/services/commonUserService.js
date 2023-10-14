const bcrypt = require('bcrypt');
const { ValidationError } = require('custom-error-handlers/error');


exports.passwordUpdateService = async (datamodel, id, currentPassword, newPassword, confirmPassword) => {

    if (!currentPassword) {
        throw new ValidationError('Current Password is required')
    }
    if (!newPassword) {
        throw new ValidationError('New Password is required')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required')
    }
    if (newPassword !== confirmPassword) {
        throw new ValidationError('New Password and Confirm Password must be the same')
    }

    const user = await datamodel.findById({ _id: id });

    const checkPassword = await bcrypt.compare(currentPassword, user.password);

    if (!checkPassword) {
        throw new ValidationError('Current Password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await datamodel.updateOne({ _id: id }, { password: hashedPassword });

    return { status: 'success', message: 'Password Save Changed!' }
};

exports.emailUpdateService = async (datamodel, id, email) => {
    if (!email) {
        throw new ValidationError('Email is required')
    }

    const existingEmail = await datamodel.findOne({ email });

    if (existingEmail) {
        throw new ValidationError('Email already exists')
    }

    await datamodel.updateOne({ _id: id }, { email });

    return { status: 'success', message: 'Email Save Changed!' }

};

// exports.forgetPasswordService = async (datamodel, email, newPassword, confirmPassword) => {
//     if (!email) {
//         throw new ValidationError('Email is required')
//     }
//     if (!newPassword) {
//         throw new ValidationError('New Password is required')
//     }
//     if (newPassword.length < 6) {
//         throw new ValidationError('Password must be at least 6 characters')
//     }
//     if (!confirmPassword) {
//         throw new ValidationError('Confirm Password is required');
//     }
//     if (newPassword !== confirmPassword) {
//         throw new ValidationError('New Password and Confirm Password must be the same')
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     await datamodel.updateOne({ email }, { password: hashedPassword });

//     return { status: 'success', message: 'Password Save Changed!' }

// };