const { Schema, model } = require('../connection');

const userSchema = new Schema({
    title: { type: String, required: true },
    caption: { type: String, unique: true },
    image: { type: String, default: 'unknown' },
    community: { type: String, },
    uploadedBy: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = model('post', userSchema);
