import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoURL);
//mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => {
	console.log('Mongo DB connection failed');
})

connection.on('connected', () => {
	console.log('Mongo DB connection succesful');
})

export default mongoose;