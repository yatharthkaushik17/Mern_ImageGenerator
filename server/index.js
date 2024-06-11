const express = require("express");
const app = express();
const db = require("./config/database")
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const cookieParser = require('cookie-parser');


const PhotoRoute = require("./routes/Photos");
// app.use(cookieParser());
// Enable CORS for all origins
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
db.connect();


app.use('/api/v1' , PhotoRoute);


app.get('/' ,(req,res)=>{
    res.send("This is home page");
})


app.listen(PORT,()=>{
    console.log(`Server Started at PORT NO ${PORT}`)
})