const { Schema, model } = require('../connection');
const userSchema = new Schema({
    name: { type: String, required: true },
    cover: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = model('community', userSchema);
