const express = require('express')
const router = express.Router()
let fetchBBUser = require('../middleware/fetchBBUser')
const Donor = require('../models/Donor')
const mongoose = require('mongoose')
const {Schema} = mongoose;
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const JWT_SECRET = "BloodBankisaGoodProject";

// Route 1 : Get all donor details using GET "/api/donor/getDonorDetais" . login required
router.get('/getDonorDetails', fetchBBUser, async (req,res)=>{
    try {
        const donors = await Donor.find({ BBid: req.user.id})
        res.json(donors)
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 2 : Add a donor using POST "/api/donor/addDonor" . login required
router.post('/addDonor', fetchBBUser,[

    body('DFname','Too short Name').isLength({min: 5}),
    body('DLname','Too short Name').isLength({min: 5}),

], async (req,res)=>{
    try {
        const {DFname,DLname,DAge,DGender,DAdharNo,DBloodGroup,State,Address,NoOfDonations,DMobile,TotalBloodDonated} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const donor = new Donor({
            DFname,DLname,DAge,DGender,DAdharNo,DBloodGroup,State,Address,NoOfDonations,DMobile,TotalBloodDonated, BBid: req.user.id
        })
        const savedDonor = await donor.save()
        res.json(savedDonor);
    }
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 3 : Update a donor using PUT "/api/donor/updateDonor" . login required
router.put('/updateDonor/:id', fetchBBUser, async (req,res)=>{
    const {DFname,DLname,DAge,DGender,DAdharNo,DBloodGroup,State,Address,NoOfDonations,DMobile,TotalBloodDonated} = req.body;

    try {
        const newDonor = {};
        if(DFname) {newDonor.DFname = DFname; }
        if(DLname) {newDonor.DLname = DLname; }
        if(DAge) {newDonor.DAge = DAge; }
        if(DGender) {newDonor.DGender = DGender; }
        if(DAdharNo) {newDonor.DAdharNo = DAdharNo; }
        if(DBloodGroup) {newDonor.DBloodGroup = DBloodGroup; }
        if(State) {newDonor.State = State; }
        if(Address) {newDonor.Address = Address; }
        if(NoOfDonations) {newDonor.NoOfDonations = NoOfDonations; }
        if(DMobile) {newDonor.DMobile = DMobile; }
        if(TotalBloodDonated) {newDonor.TotalBloodDonated = TotalBloodDonated; }

        let donor = await Donor.findById(req.params.id);
        if(!donor) {return res.status(400).send("Donor not found"); }
        if(donor.BBid.toString() !== req.user.id){return res(401).send("Not Allowed"); }

        donor = await Donor.findByIdAndUpdate(req.params.id, {$set: newDonor}, {new: true})
        res.json({ donor });
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})


// Route 4 : Delete a donor using DELETE "/api/donor/deleteDonor" . login required
router.delete('/deleteDonor/:id', fetchBBUser, async (req,res)=>{

    try {
        
        let donor = await Donor.findById(req.params.id);
        if(!donor) {return res.status(400).send("Donor not found"); }
        if(donor.BBid.toString() !== req.user.id){return res(401).send("Not Allowed"); }

        donor = await Donor.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Donor info was deleted", donor: donor });

    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }

})

module.exports = router