const express = require('express')
const router = express.Router()
let fetchBBUser = require('../middleware/fetchBBUser')
const BloodDonation = require('../models/BloodDonation')
const mongoose = require('mongoose')
const {Schema} = mongoose;
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const JWT_SECRET = "BloodBankisaGoodProject";
const BloodInventory = require('../models/BloodInventory')

// Route 1 : Get all Blood Donation details using GET "/api/bloodDonation/getBloodDonationDetails" . login required
router.get('/getBloodDonationDetails', fetchBBUser, async (req,res)=>{
    try {
        const bloodDonation = await BloodDonation.find({ BBid: req.user.id})
        res.json(bloodDonation)
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 2 : Add a Blood Donatiob using POST "/api/bloodDonation/addBloodDonation" . login required
router.post('/addBloodDonation', fetchBBUser, async (req,res)=>{
    try {
        const {DId,BloodDonatedQty,BGroup,BloodWeight,DonationDate,AnyMedicalCondition,ExpDate,MStaffName,MStaffRole} = req.body;

        const existingBloodDonation = await BloodDonation.findOne({DId, DonationDate});
        if(existingBloodDonation){
            return res.status(400).json({"error": "Entry for the same donor on the same date already exists"});
        }

        let bloodInventory = await BloodInventory.findOne({BBid: req.user.id})

        if (!bloodInventory) {
            bloodInventory = new BloodInventory({
                APlusStock: 0,
                AMinusStock: 0,
                BPlusStock: 0,
                BMinusStock: 0,
                OPlusStock: 0,
                OMinusStock: 0,
                ABPlusStock: 0,
                ABMinusStock: 0,
                BBid: req.user.id, 
            });
        }

        switch (BGroup) {
            case 'A+':
                bloodInventory.APlusStock = (bloodInventory.APlusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'A-':
                bloodInventory.AMinusStock = (bloodInventory.AMinusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'B+':
                bloodInventory.BPlusStock = (bloodInventory.BPlusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'B-':
                bloodInventory.BMinusStock = (bloodInventory.BMinusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'O+':
                bloodInventory.OPlusStock = (bloodInventory.OPlusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'O-':
                bloodInventory.OMinusStock = (bloodInventory.OMinusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'AB+':
                bloodInventory.ABPlusStock = (bloodInventory.ABPlusStock || 0) + parseInt(BloodDonatedQty);
                break;
            case 'AB-':
                bloodInventory.ABMinusStock = (bloodInventory.ABMinusStock || 0) + parseInt(BloodDonatedQty);
                break;
            default:
                throw new Error('Invalid blood group');
        }

        const bloodDonation = new BloodDonation({
            DId,BBid: req.user.id,BloodDonatedQty,BGroup,BloodWeight,DonationDate,AnyMedicalCondition,ExpDate,MStaffName,MStaffRole
        })
        const savedBloodDonation = await bloodDonation.save()
        const savedBloodInventory = await bloodInventory.save()

        res.json({savedBloodDonation,savedBloodInventory});
    }
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

module.exports = router