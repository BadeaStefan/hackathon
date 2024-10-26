import express from "express";
import eventModel from '../models/event.js';
import mongoose from "mongoose";
import userModel from '../models/user.js';

const router = express.Router();

router.get("/getparties", async (req, res) => {
    
    try {
        const party = await eventModel.find({});
        return res.json( party );
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    
})

router.post("/addparty", async (req, res) => {
    const newParty = new eventModel(req.body);
    
    try {
        const party = await newParty.save()
        return res.json(party);
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.post("/getparty", async (req, res) => {
    const { name } = req.body;
    try {
        const party = await eventModel.findOne({ name: name });
        return res.json(party);
    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

router.post("/newpartyperson", async (req, res) => {
    const { email, name } = req.body;
    
    try {
        const user = await userModel.findOne({ email: email })
        const party = await eventModel.findOne({ name: name });

        party.goingpeople.push({ personName: user.name, email: user.email });

        await party.save();

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

router.post("/editparty", async (req, res) => {
    const ND = req.body;
    

    try {
        const a = { ...party, name: ND.name, location: ND.location, date: ND.date, budget: ND.budget, maxpeople: ND.maxpeople, description: ND.description };

        const party = await eventModel.updateOne({ _id: ND._id }, {$set:a});
        //console.log(party);
       // await eventModel(a).save();
        

    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

export default router;