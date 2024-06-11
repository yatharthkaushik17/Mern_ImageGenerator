const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");


const otpSchema =mongoose.Schema({
   email:{
    type:String,
    required:true,
   },
   otp:{
    type:String,
    required:true,
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,
   }

});

//function to send mail

async function sendVerificationmail(email,otp){
   try {
      const mailResponse = mailSender(email,"Verfication Email from Site",otp);
      console.log("Email send",mailResponse);

      
   } catch (error) {
      console.log("error occured while sending mail",error.message);
      throw error
      
      
   }
}

otpSchema.pre("save",async function(next){
   await sendVerificationmail(this.email, this.otp);
   next();
})

module.exports=mongoose.model("OTP",otpSchema);