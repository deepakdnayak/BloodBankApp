const express = require('express')
const router = express.Router()
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate hospital auth web token
const JWT_SECRET = "BloodBankisaGoodProject";
let fetchHUser = require('../middleware/fetchHUser')

const Hospital = require('../models/Hospital') // importing schema

// Route 1 : create a hispitalUser using : POST "/api/authHospital/createUser" No login required
router.post('/createHUser',[
    body('HUserName',"invalid HName").isLength({min: 5}), // setting domain constraints
    body('HPassword').isLength({min: 5}),
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array() });
    }

    // check if the Huser already exists
    try {
        
        let hospital = await Hospital.findOne({HUserName: req.body.HUserName})
        if(hospital){
            return res.status(400).json({error: "User Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.HPassword, salt);

        // create a new HospitalUser
        hospital = await Hospital.create({
            HLicenseNo:  req.body.HLicenseNo,
            HName:  req.body.HName,
            HState:  req.body.HState,
            HCity:  req.body.HCity,
            HAddress:  req.body.HAddress,
            IsGov:req.body.IsGov,
            HPhone:  req.body.HPhone,
            HUserName: req.body.HUserName,
            HPassword: secPass,
        });

        const data = {
            user: {
                id: hospital.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // send auth token as responce
        res.json({authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(500).send("Internal Server Error");        
    }

})

// Route 2 : Authenticate a hospitalUser using POST : "/api/authHospital/login" No login required
router.post('/login',[

    body('HUserName',"invalid HName").isLength({min: 5}), // setting domain constraints
    body('HPassword').isLength({min: 5}),

], async (req,res)=>{

    // if errors are found , return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {HUserName,HPassword} = req.body;
    try {
        
        let Huser = await Hospital.findOne({HUserName})
        if(!Huser){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(HPassword,Huser.HPassword);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            Huser: {
                id: Huser.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // send the validated user token as responce
        res.json({authToken})
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 3 : get logged in user details using: POST "/api/auth/getuser" . login required
router.post('/getHUser',fetchHUser, async (req,res)=>{
    try {

       HUserId = req.user.id; 
       const user = await Hospital.findById(HUserId).select("-HPassword")
       res.send(user)

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router