const express = require('express')
const router = express.Router()
let fetchHUser = require('../middleware/fetchHUser')
const Patient = require('../models/Patient')
const mongoose = require('mongoose')
const {Schema} = mongoose;
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const JWT_SECRET = "BloodBankisaGoodProject";

// Route 1 : Get all patient details using GET "/api/patient/getPatientDetails" . login required
router.get('/getPatientDetails', fetchHUser, async (req,res)=>{
    try {
        const patients = await Patient.find({ HId: req.user.id})
        res.json(patients)
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 2 : Add a patient using POST "/api/patient/addPatient" . login required
router.post('/addPatient', fetchHUser,[

    body('PFname','Too short Name').isLength({min: 5}),
    body('PLname','Too short Name').isLength({min: 5}),

], async (req,res)=>{
    try {
        const {PFname,PLname,PAge,PGender,PAdharNo,PBloodGroup,State,City,Address,PMobile} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const patient = new Patient({
            PFname,PLname,PAge,PGender,PAdharNo,PBloodGroup,State,City,Address,PMobile, HId: req.user.id
        })
        const savedPatient = await patient.save()
        res.json(savedPatient);
    }
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 3 : Update a patient using PUT "/api/patient/updatePatient" . login required
router.put('/updatePatient/:id', fetchHUser, async (req,res)=>{
    const {PFname,PLname,PAge,PGender,PAdharNo,PBloodGroup,State,City,Address,PMobile} = req.body;

    try {

        const newPatient = {}
        if(PFname) {newPatient.PFname = PFname; }
        if(PLname) {newPatient.PLname = PLname; }
        if(PAge) {newPatient.PAge = PAge; }
        if(PGender) {newPatient.PGender = PGender; }
        if(PAdharNo) {newPatient.PAdharNo = PAdharNo; }
        if(PBloodGroup) {newPatient.PBloodGroup = PBloodGroup; }
        if(State) {newPatient.State = State; }
        if(City) {newPatient.City = City; }
        if(Address) {newPatient.Address = Address; }
        if(PMobile) {newPatient.PMobile = PMobile; }

        let patient = await Patient.findById(req.params.id);
        if(!patient) {return res.status(400).send("Patient not found"); }
        if(patient.HId.toString() !== req.user.id){return res(401).send("Not Allowed"); }

        patient = await Patient.findByIdAndUpdate(req.params.id, {$set: newPatient}, {new: true})
        res.json({ patient });
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})


module.exports = router