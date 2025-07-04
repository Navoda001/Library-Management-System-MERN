const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid')

const memberSchema = new mongoose.Schema({
    memberId: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    membershipDate: { type: String, default: () => new Date().toISOString().split("T")[0] }
});

module.exports =  mongoose.model("Member",memberSchema);