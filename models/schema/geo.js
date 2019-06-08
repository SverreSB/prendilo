const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
        validate: [arrayLimit, '{PATH} must contain 2 items(latitude and longitude)']
    }
});

function arrayLimit(val){ 
    return val.length == 2;
}

exports.GeoSchema = GeoSchema;