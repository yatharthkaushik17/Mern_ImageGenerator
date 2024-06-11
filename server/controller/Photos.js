const axios = require("axios");
require("dotenv").config();
const History =  require("../model/history");
const User = require("../model/User");

exports.getPhoto = async(req,res)=>{
    try {
        // console.log(req);
        const {query}=  req.params;
        const userId = req.user.id;
        console.log(userId)
        const API_URL = process.env.UNSPLASH_URL;
        const API_KEY = process.env.UNSPLASH_KEY;

        const existing = await User.findById(userId);

        if(!existing){
            return res.status(404).json({
                success:true,
                message:"User Not Found"
            })
        }
       console.log("error1")
       console.log(existing._id)
        
        const ImagesPerCount = 20;
        if(!query){
            return res.status(404).json({
                message:"query is empty"
            })
        }
        console.log("error2")



        const result =  await axios.get(`${API_URL}?query=${query}&page=1&per_page=${ImagesPerCount}&client_id=${API_KEY}`);
        console.log("error3")

        // console.log("data: " ,result.data );
        const history = await History.create({
            userId:existing._id,
            query:query,
        })
        console.log("error4")

        if(!history){
            return res.status(404).json({
                message:"Not able to create history"
            })
        }
        console.log("error5")
        await User.findByIdAndUpdate(
            {
              _id: existing._id,
            },
            {
              $push: {
                history: history._id,
              },
            },
            { new: true }
          )
          console.log("error6")
        return res.status(200).json({
            success:true,
            message:"File fetched Successfully",
            data:result.data
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Not able to fetch photoss",
            error:error.message,
        })
        
    }
}