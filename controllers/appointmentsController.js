const Appointment = require('../models/Appointment')
const User = require('../models/User')

// @desc Get all appointments 
// @route GET /appointments
// @access Private
const getAllAppointments = async (req, res) => {
    // Get all appointments from MongoDB
    const appointments = await Appointment.find().lean()

    // If no appointments 
    if (!appointments?.length) {
        return res.status(400).json({ message: 'No appointments found' })
    }

    // Add username to each Appointment before sending the response 
    const appointmentsWithUser = await Promise.all(appointments.map(async (Appointment) => {
        const user = await User.findById(Appointment.user).lean().exec()
        return { ...Appointment, username: user.username }
    }))

    res.json(appointmentsWithUser)
}

// @desc Create new Appointment
// @route POST /appointments
// @access Private
const createNewAppointment = async (req, res) => {
    const { user, clinic, timeStr } = req.body

    // Confirm data
    if (!user || !clinic || !timeStr) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const time = new Date(timeStr).toISOString()

    // Check for duplicate clinic time
    const duplicate = await Appointment.findOne({ clinic, time }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate appointment time' })
    }

    // Create and store the new user 
    const appointment = await Appointment.create({ user, clinic, time })

    if (appointment) { // Created 
        return res.status(201).json({ message: 'New appointment created' })
    } else {
        return res.status(400).json({ message: 'Invalid appointment data received' })
    }

}

// @desc Update a Appointment
// @route PATCH /appointments
// @access Private
const updateAppointment = async (req, res) => {
    const { id, user, clinic, timeStr } = req.body

    // Confirm data
    if (!id || !user || !clinic || !timeStr ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const time = new Date(timeStr).toISOString()

    // Confirm Appointment exists to update
    const appointment = await Appointment.findById(id).exec()

    if (!appointment) {
        return res.status(400).json({ message: 'Appointment not found' })
    }

    // Check for duplicate clinic time
    const duplicate = await Appointment.findOne({ clinic, time }).lean().exec()

    // Allow renaming of the original Appointment 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Appointment clinic' })
    }

    appointment.user = user
    appointment.clinic = clinic
    appointment.time = time

    const updatedAppointment = await appointment.save()

    res.json(`'${updatedAppointment.clinic}' updated`)
}

// @desc Delete a Appointment
// @route DELETE /appointments
// @access Private
const deleteAppointment = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Appointment ID required' })
    }

    // Confirm Appointment exists to delete 
    const appointment = await Appointment.findById(id).exec()

    if (!appointment) {
        return res.status(400).json({ message: 'Appointment not found' })
    }

    const result = await appointment.deleteOne()

    const reply = `Appointment '${result.clinic}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllAppointments,
    createNewAppointment,
    updateAppointment,
    deleteAppointment
}