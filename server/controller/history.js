const History = require("../model/history");
const User = require("../model/User.js")

exports.history = async(req,res)=>{
    try {
        
        const userId = req.user.id;

        const user = await User.findById(userId);
        const history = await History.find({ userId: userId }).sort({ createdAt: -1 }).exec();
        console.log(history);

        return res.status(200).json({
            success:true,
            message:"History fetched successfully",
            data:history
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Not able to fetch the history successfully",
            error:error.message
        })
        
    }
}