const { Schema, model } = require('mongoose');

const employeeSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: String, required: true },
    }, {
    timestamps: true
});

module.exports = model('employee', employeeSchema);
