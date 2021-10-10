import mongoose from "mongoose";

const statisticSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'URL'
    },
    visitorIP: {
        type: String
    }
}, {
    timestamps: true
});


export const Statistics = mongoose.model('Statistic', statisticSchema);
