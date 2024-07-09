const connectToMongo = require('./db') // import db connect function
const express = require('express') // import express
let cors = require('cors') // import cors to make api call from browser

connectToMongo();  // connect to db
const app = express();  // app is instance of express
const port = 5000;  // mention port number

app.use(cors()) // call cors
app.use(express.json()) // This middleware parses incoming JSON requests and makes the parsed data available in req.body

// available paths
app.use('/api/authHospital', require('./routes/authHospital')) // will use the router defined in ./routes/authHospital
app.use('/api/authBloodBank', require('./routes/authBloodBank')) // will use the router defined in ./routes/authBloodBank
app.use('/api/donor', require('./routes/donor'))
app.use('/api/bloodDonation',require('./routes/bloodDonation'))
app.use('/api/bloodRecieved',require('./routes/bloodRecieved'))
app.use('/api/patient',require('./routes/patient'))


app.listen(port, ()=> {  // starts the server and runs 
    console.log(`BloodBank app listning at http://localhost:${port}`);
})