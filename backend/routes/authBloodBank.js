const express = require('express')
const router = express.Router()
const {query,validationResult, body} = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaGoodProject";
let fetchBBUser = require('../middleware/fetchBBUser')

const BloodBank = require('../models/BloodBanks') // importing schema

// Route 1 : create a hispitalUser using : POST "/api/authBloodBank/createBBUser" No login required
router.post('/createBBUser',[
    body('BBUserName',"invalid BBName").isLength({min: 5}), // setting domain constraints
    body('BBPassword').isLength({min: 5}),
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({error: errors.array() });
    }

    // check if the BBuser already exists
    try {
        
        let bloodBank = await BloodBank.findOne({BBUserName: req.body.BBUserName})
        if(bloodBank){
            success = false;
            return res.status(400).json({error: "User Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.BBPassword, salt);

        // create a new BBUser
        bloodBank = await BloodBank.create({
            BLcNo:  req.body.BLcNo,
            BBName:  req.body.BBName,
            BBAddress:  req.body.BBAddress,
            BBState:  req.body.BBState,
            BBcity:  req.body.BBcity,
            IsGov:  req.body.IsGov,
            BBPhone:  req.body.BBPhone,
            BBUserName: req.body.BBUserName,
            BBPassword: secPass,
        });

        const data = {
            user: {
                id: bloodBank.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // send auth token as responce
        success = true;
        res.json({success,authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(500).send("Internal Server Error");        
    }

})

// Route 2 : Authenticate a BBUser using POST : "/api/authBloodBank/login" No login required
router.post('/login',[

    body('BBUserName',"invalid BBName").isLength({min: 5}), // setting domain constraints
    body('BBPassword').isLength({min: 5}),

], async (req,res)=>{

    let success = false;

    // if errors are found , return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {BBUserName,BBPassword} = req.body;
    try {
        
        let BBuser = await BloodBank.findOne({BBUserName})
        if(!BBuser){
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials 111"});
        }

        const passwordCompare = await bcrypt.compare(BBPassword,BBuser.BBPassword);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials 222"});
        }

        const data = {
            BBuser: {
                id: BBuser.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // send the validated user token as responce
        success = true;
        res.json({success,authToken})
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 3 : get logged in user details using: POST "/api/auth/getuser" . login required
router.post('/getBBUser',fetchBBUser, async (req,res)=>{
    try {

       BBUserId = req.user.id; 
       const user = await BloodBank.findById(BBUserId).select("-BBPassword")
       res.send(user)

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router