const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the Lending schema
const lendingSchema = new mongoose.Schema({
    lendingId: { type: String, default: uuidv4, unique: true },
    book: { type: String, required: true },
    member: { type: String, required: true },
    lendingDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    returnDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    isActiveLending: { type: Boolean, required: true },
    overdueDays: { type: Number },
    fineAmount: { type: Number },
});

// Check if the model is already defined, avoid overwriting
const Lending = mongoose.models.Lending || mongoose.model('Lending', lendingSchema);

module.exports = Lending;