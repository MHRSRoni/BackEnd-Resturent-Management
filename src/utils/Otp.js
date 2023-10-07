const adminModel = require("../models/adminModel");
const customerModel = require("../models/customerModel");
const staffModel = require("../models/staffModel");

/**
 * A class for generating and saving OTP codes and verifying them.
 */
class Otp {
    /**
     * Create an instance of the Otp class.
     * @param {Object} options - Configuration options for creating an OTP.
     * @param {string} options.role - The role associated with the OTP (e.g., 'admin', 'customer', 'staff').
     * @param {string} options.identifier - The identifier used for OTP verification (email or ObjectId).
     */
    constructor({ role, identifier }) {

        /**
         * The Mongoose model based on the provided role.
         * @type {MongooseModel|null}
         */
        this.model = role === 'admin' ? adminModel :
            role === 'customer' ? customerModel :
            role === 'staff' ? staffModel : null;

        /**
         * The identifier used for OTP verification (email or ObjectId).
         * @type {string}
         */
        this.identifier = identifier;

        /**
         * Indicates if the identifier is an email.
         * @type {boolean}
         */
        this.isEmail = identifier.indexOf('@') > -1 ? true : false;

        /**
         * Indicates if the identifier is an ObjectId.
         * @type {boolean}
         */
        this.isObjectId = identifier.indexOf('@') > -1 ? false : true;
        this.code = Math.floor(100000 + Math.random() * 900000)
        
    }

    /**
 * Get the email associated with the identifier.
 * @async
 * @function
 * @returns {Promise<string>} The email address associated with the identifier.
 * @throws {Error} Throws an error if something goes wrong during the process.
 */
    async getEmail() {
        try {
            if (this.isEmail) {
                return this.identifier
            }
            else{
                const data = await this.model.findById(this.identifier)
                return data.email
            }
        } catch (error) {
            throw new Error('something went wrong');
        }
    }

    /**
     * Save the OTP code to the database.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if successful, `false` if there's an error.
     */
    async save() {
        try {
            // If email is given 
            if (this.isEmail) { 
                await this.model.findOneAndUpdate({ email: this.identifier }, {$set : { otp: this.code }}, { upsert: true });
            }
            // If ObjectId is given
            else { 
                await this.model.findByIdAndUpdate(this.identifier, {$set : { otp: this.code }}, { upsert: true });
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    /**
     * Verify the OTP code and mark it as used.
     * @param {number} code - The OTP code to verify.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the OTP is valid and marked as used, `false` otherwise.
     */
    async verify(code) {
        try {
            // If otp is not 0
            if (code) {
                // If email is given
                if (this.isEmail) { 
                    const data = await this.model.findOneAndUpdate({ email: this.identifier, otp : code }, {$set : { otp: 0 }});
                    if (data) { return true; }
                }
                // If ObjectId is given
                else { 
                    const data = await this.model.findOneAndUpdate({ _id: this.identifier, otp : code }, {$set : { otp: 0 }});
                    if (data) { return true; }
                }
                return false;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    
}

module.exports = { Otp };
