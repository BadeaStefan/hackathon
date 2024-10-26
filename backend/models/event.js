import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    maxpeople: {
        type: Number,
        required: true
    },
    responsibilities: [],
    description: {
        type: String,
        required: true
    },
    goingpeople:[],


}, {
    timpstamps: true,
})

const eventModel = mongoose.model('events', eventSchema);

export default eventModel;