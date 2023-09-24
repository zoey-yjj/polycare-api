const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        clinic: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Appointment', appointmentSchema)