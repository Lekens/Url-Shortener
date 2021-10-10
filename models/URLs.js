import mongoose from "mongoose";

// create a url schema
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true,
        dropDups: true,
        trim: true,
        required: true
    },
    urlCode: {
        type: String,
        unique: true,
        dropDups: true,
        trim: true,
        required: true
    },
    creatorIP: {
        type: String,
        default: 'Anonymous'
    }
}, {
    timestamps: true
});

export const URLs = mongoose.model('URL', urlSchema);
