const mongoose = require('mongoose');

let koliSchema = mongoose.Schema({
    length : {
        type: Number,
        default: 0,
    },
    awbUrl : {
        type: String,
        required: [true, 'Url harus diisi'],
    },
    chargeableWeight : {
        type: Number,
        default: 0,
    },
    width : {
        type: Number,
        default: 0,
    },
    surcharge : {
        type: Array,
        default: [],
    },
    height : {
        type: Number,
        default: 0,
    },
    description : {
        type: String,
    },
    formulaId : {
        type: String,
    },
    connote : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connote'
    },
    volume : {
        type: Number,
        default: 0,
    },
    weight : {
        type: Number,
        default: 0,
    },
    customField : {
        type: Object,
        default: {}
    },
    code: {
        type: String,
        required: [true, 'Kode koli harus diisi']
    }
}, { timestamps: true });

module.exports = mongoose.model('Koli', koliSchema);
