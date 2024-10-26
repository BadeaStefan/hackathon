/* eslint-disable no-undef */
import express from "express";
import userModel from '../models/user.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtKey = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
	const userInfo = req.body;
	const hashedPw = await hash(userInfo.password, 12);
	userInfo.password = hashedPw;
	const newUser = new userModel(userInfo);
	
	try{
		const userSave = await newUser.save();
		const authToken = jwt.sign({ email: newUser.email, isAdmin:false }, jwtKey, { expiresIn: '3h' });
		
		res.status(201).json({user: newUser.name, token: authToken });
	}catch(error){
	 return res.status(400).json({ message:'Something went wrong' });
	}

})

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await userModel.findOne({ email: email });
		const pwValidation = await compare(password, user.password);
		if (!pwValidation) {
			return res.status(422).json({ message: 'Invalid credentials' });
		} else {
			const authToken = jwt.sign({ email: email, name: user.name, isAdmin: user.isAdmin }, jwtKey, { expiresIn: '3h' });

			res.json({ authToken });
		}
	} catch (error) {
		res.status(400).json(error);
	}
	
});

export default router;