const User = require("../model/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require("dotenv").config();
const otpGenerator = require("otp-generator")
const OTP = require("../model/OTP")


exports.Login = async(req,res)=>{
    try{
        const {email , password} = req.body;
        console.log(email,password);
        if(!email || !password){
            return res.status(401).json({
                success: false,
                msg: "FIll all inputs",
            })
        }
        console.log(email,password);
        let user = await User.findOne(
           
                { email}
        
            );
        
        console.log(email,password);
        console.log(user)

        if(!user){
            return res.status(401).json({
                success:false,
                msg:"User not exist Please register first"
                
            })
        }
         //token generate,after password match 
         console.log( await bcrypt.compare(password,user.password));

         if(await bcrypt.compare(password,user.password)){

            const payload ={
                email:user.email,
                id:user._id,
                
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            user.token = token;
            user.password = undefined;

            const options ={
                 expires: new Date(Date.now()+3*24*60*60*1000),
                 httpOnly:true,
            }

            //create cookies and send response

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                message: "Logged in successfully",
                user,
            })
        } else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        
    }catch(e){
        return res.status(500).json({
            success: false,
            msg : "Unable to login user need to Signup first",
            err : e.message
        })
    }
} 

exports.Signup = async(req,res)=>{
    try{
        const {email,password,confirmPassword,name,number} = req.body;
        if(!name ||!email || !password || !confirmPassword || !number){
            return res.status(400).json({
               success:false,
               message:"All fields are required"
            })
       }

        const existingUser = await User.findOne({email});

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password are not matched"
            })
        }


        if(existingUser){
            res.status(400).json({
                success: false,
                msg: "User already exist"
            })
            process.exit(1);
        }

        //hashed the password
        const hashedPassword =  await bcrypt.hash(password,10);


        const user = await User.create({
            email,
            password:hashedPassword,
            name,
            number
        })
        return res.status(200).json({
            success: true,
            msg: "User created successfully"
        })
            
    }catch(e){
        return res.status(500).json({
            success: false,
            msg: "Error Occurred while Signup",
            error: e.message
        })
    }
}

exports.sendOtp = async (req,res)=>{
    try {
        //fetch email from req body
        console.log(req.body)
     const { email } = req.body;
     console.log(email,"this is the email")
 
     //check if user already exist or not
 
     const existingUser = await User.findOne({email});
 
     //ifuser already exist then return  a response
     if(existingUser){
         return res.status(401).json({
             success:false,
             message:"user Already exist"
         })
     }
 
     var otp = otpGenerator.generate(6,
         {
             upperCaseAlphabets:false,
             lowerCaseAlphabets:false,
             specialChars:false
         })
     console.log("OTP Generator",otp);
     //check unique otp or not
     let result = await OTP.findOne({otp:otp});
     console.log("REsult",result);
     while(result){
  
         otp = otpGenerator.generate(6,{
             upperCaseAlphabets:false,
             lowerCaseAlphabets:false,
             specialChars:false,
         });
 
         result = await OTP.findOne({otp:otp});
 
     }    
     const otpPayload = {email,otp};
     //create an entry in db
     const otpBody = await OTP.create(otpPayload);
 
     console.log(otpBody);
 
     return res.status(200).json({
         success:true,
         message:"OTP send Succesfully",
         otp,
     })
 
     
    } catch (error) {
     console.log(error)
 
      return res.status(500).json({
         success:false,
         message:"Error occur at sending OTP",
         
     });
     
    }
}
exports.verifyOtp = async(req,res)=>{
    try {
            const {otp,email} =req.body;

            if(!otp){
                return res.status(400).json({
                    success:false,
                    message:"Enter the otp"
                })
            }

            const recentOTP =await OTP.find({email}).sort({ createdAt: -1 }).limit(1);

            console.log(recentOTP)
            console.log(otp)
            console.log(recentOTP[0].otp)

            if(recentOTP.length == 0){
                //OTP not found
                return res.status(400).json({
                    success:false,
                    message:"OTP not found"
                })
            } else if(otp!= recentOTP[0].otp){
                //Invalid OTP
                return res.status(400).json({
                    success:false,
                    message:"OTP not matching"
                })

            }else{
                return res.status(200).json({
                    success:true,
                    message:"OTP matched"
                })
            }
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error Occured while verifying the otp"
        })
        
    }
}