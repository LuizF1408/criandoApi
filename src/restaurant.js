const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:String,
    cuisine:String,
    borough:String
});

const Restaurant = mongoose.model('restaurantes', restaurantSchema);

module.exports = Restaurant; 