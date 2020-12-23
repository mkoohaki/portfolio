const mongoose = require('mongoose');
//Create Schema 
const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});
//Create and instantiate model with schema
const Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;
