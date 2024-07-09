const express = require('express')
const router = express.Router()
let fetchHUser = require('../middleware/fetchHUser')
const BloodRecieved = require('../models/BloodRecieved')
const mongoose = require('mongoose')
const {Schema} = mongoose;
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const JWT_SECRET = "BloodBankisaGoodProject";
const BloodInventory = require('../models/BloodInventory')


// Route 1 : Get all Blood Recieved details using GET "/api/bloodRecieved/getBloodRecievedDetails" . login required
router.get('/getBloodRecievedDetails', fetchHUser, async (req,res)=>{
    try {
        const bloodRecieved = await BloodRecieved.find({ HId: req.user.id})
        res.json(bloodRecieved)
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 2 : Add a Blood recieved using POST "/api/bloodRecieved/addBloodRecieved" . login required
router.post('/addBloodRecieved', fetchHUser, async (req,res)=>{
    try {
        const {DId,BBid,BloodDonatedQty,BGroup,Date} = req.body;
        
        let bloodInventory = await BloodInventory.findOne({BBid: BBid});
        let stockAvailable;

        // Check if the required blood group has enough stock
        switch (BGroup) {
            case 'A+':
                stockAvailable = bloodInventory.APlusStock;
                break;
            case 'A-':
                stockAvailable = bloodInventory.AMinusStock;
                break;
            case 'B+':
                stockAvailable = bloodInventory.BPlusStock;
                break;
            case 'B-':
                stockAvailable = bloodInventory.BMinusStock;
                break;
            case 'O+':
                stockAvailable = bloodInventory.OPlusStock;
                break;
            case 'O-':
                stockAvailable = bloodInventory.OMinusStock;
                break;
            case 'AB+':
                stockAvailable = bloodInventory.ABPlusStock;
                break;
            case 'AB-':
                stockAvailable = bloodInventory.ABMinusStock;
                break;
            default:
                throw new Error('Invalid blood group');
        }

        if (stockAvailable < BloodDonatedQty) {
            return res.status(400).send({ error: 'Required amount of blood not found' });
        }

        // Decrease the count based on the blood group
        switch (BGroup) {
            case 'A+':
                bloodInventory.APlusStock -= BloodDonatedQty;
                break;
            case 'A-':
                bloodInventory.AMinusStock -= BloodDonatedQty;
                break;
            case 'B+':
                bloodInventory.BPlusStock -= BloodDonatedQty;
                break;
            case 'B-':
                bloodInventory.BMinusStock -= BloodDonatedQty;
                break;
            case 'O+':
                bloodInventory.OPlusStock -= BloodDonatedQty;
                break;
            case 'O-':
                bloodInventory.OMinusStock -= BloodDonatedQty;
                break;
            case 'AB+':
                bloodInventory.ABPlusStock -= BloodDonatedQty;
                break;
            case 'AB-':
                bloodInventory.ABMinusStock -= BloodDonatedQty;
                break;
        }

        const bloodRecieved = new BloodRecieved({
            DId,BBid,BloodDonatedQty,BGroup,Date,HId: req.user.id
        })
        const savedBloodRecieved = await bloodRecieved.save()
        const savedBloodInventory = await bloodInventory.save()
        res.json({savedBloodRecieved,savedBloodInventory});
    }
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

module.exports = router

