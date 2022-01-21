const mongoose = require('mongoose');

let locationSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Nama lokasi harus diisi']
    },
    latitude : {
        type: String,
        required: [true, 'latitude harus diisi']
    },
    longitude : {
        type: String,
        required: [true, 'longitude harus diisi']
    },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
