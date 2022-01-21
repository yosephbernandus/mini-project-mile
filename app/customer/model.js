const mongoose = require('mongoose');

let customerSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Nama lokasi harus diisi']
    },
    address : {
        type: String,
        required: [true, 'address harus diisi'],
        maxlength: [255, 'panjang nama akun harus antara 3 - 255 karakter'],
        minlength: [3, 'panjang nama akun harus antara 3 - 255 karakter']
    },
    email : {
        type: String,
    },
    phone : {
        type: String,
        required: [true, 'phone number harus diisi'],
        maxlength: [20, 'panjang nama akun harus antara 3 - 20 karakter'],
        minlength: [3, 'panjang nama akun harus antara 3 - 20 karakter']
    },
    addressDetail : {
        type: String,
    },
    zipCode : {
        type: String,
        required: [true, 'Zip Code harus diisi']
    },
    zoneCode : {
        type: String,
        required: [true, 'Zone Code harus diisi']
    },
    organizationId : {
        type: Number,
        required: [true, 'organizationID harus diisi']
    },
    location : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
