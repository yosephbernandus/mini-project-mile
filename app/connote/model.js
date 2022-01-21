const mongoose = require('mongoose');

let connoteSchema = mongoose.Schema({
    number : {
        type: Number,
        required: [true, 'number harus diisi'],
    },
    service : {
        type: String,
        required: [true, 'service harus diisi'],
    },
    servicePrice : {
        type: Number,
        default: 0,
    },
    amount : {
        type: Number,
        default: 0,
    },
    code : {
        type: String,
        required: [true, 'code harus diisi'],
    },
    bookingCode : {
        type: Number,
    },
    order : {
        type: Number,
        required: [true, 'order harus diisi'],
    },
    state : {
        type: String,
        enum: ['UNPAID', 'ON PROGRESS', 'PAID'],
        default: 'UNPAID'
    },
    stateId : {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    zoneCodeFrom : {
        type: String,
        required: [true, 'zone code from harus diisi'],
    },
    zoneCodeTo : {
        type: String,
        required: [true, 'zone code to harus diisi'],
    },
    surchageAmount : {
        type: Number,
        default: null
    },
    transaction : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    actualWeight : {
        type: Number,
        default: 0,
    },
    volumeWeight : {
        type: Number,
        default: 0,
    },
    chargeableWeight : {
        type: Number,
        default: 0,
    },
    organizationId : {
        type: Number,
        default: 0,
    },
    location : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    totalPackage : {
        type: Number,
        required: [true, 'connote surchafge amount harus diisi'],
    },
    connoteSurchageAmount : {
        type: Number,
        required: [true, 'connote surchafge amount harus diisi'],
    },
    slaDay : {
        type: Number,
        required: [true, 'sla day harus diisi'],
    },
    connoteLocationName : {
        type: String,
        required: [true, 'connote location name harus diisi'],
    },
    connoteLocationType : {
        type: String,
        required: [true, 'connote location type harus diisi'],
    },
    sourceTarifDb : {
        type: String,
        required: [true, 'source tarif db harus diisi'],
    },
    idSourceTarif : {
        type: String,
        required: [true, 'id source tarif harus diisi'],
    },
    pod : {
        type: String,
        default: null
    },
    history : {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Connote', connoteSchema);
