const validate = require('validator')

module.exports.checkIfEmail = (email) => validate.isEmail(email)
module.exports.checkIfEmpty = (field) => validate.isEmpty(field)
module.exports.checkIfAlphanumeric = (field) => validate.isAlphanumeric(field)