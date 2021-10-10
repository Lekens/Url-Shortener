import * as mongoose from "mongoose";
import * as uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

// create a url schema
const urlSchema = new Schema({
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
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
}, {
    timestamps: true
});

urlSchema.plugin(uniqueValidator);

export const URLs = mongoose.model('URL', urlSchema);
