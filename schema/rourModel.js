const { model } = require("mongoose");

const toureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A toure must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    }, 
    price: {
        type: Number,
        required: [true, 'A toure must have a price']
    }
});
const Tour = mongoose.model('Tour', toureSchema);
model.exports = Tour;