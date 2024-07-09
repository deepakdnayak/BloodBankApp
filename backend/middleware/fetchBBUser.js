const jwt = require('jsonwebtoken');
const JWT_SECRET = "BloodBankisaGoodProject";

const fetchBBUser = (req,res,next) =>{
    // get user from jwt token and add id to the req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).json({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        //console.log('Token data:', data); // Log the decoded token data
        req.user = data.BBuser;
        //console.log('req.user:', req.user); // Log the req.user to ensure it is set
        next();
    } 
    catch (error) {
        
        res.status(400).send({error: "Please authenticate using a valid token"})

    }
}

module.exports = fetchBBUser;