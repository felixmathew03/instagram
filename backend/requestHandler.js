import userSchema from "./models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const {sign}=pkg;
const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "felixmathewt@gmail.com",
      pass: "qwvy rccu lwjz rmal",
    },
  });

export async function verifyEmail(req,res) {
    const {email}=req.body;
    const otp=Math.floor(Math.random()*1000000);
     // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Felix 👻" <felixmathewt@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "OTP", // Subject line
        text: "your otp", // plain text body
        html: `<h1>${otp}</h1>`, // html body
    });
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    userSchema.create({email,otp}).then(()=>{
        console.log(otp);
        return res.status(201).send({msg:"OTP succefully sent",email});
    }).catch((error)=>{
        return res.status(404).send({msg:"Error occured"})
    })
}

export async function checkOtp(req,res) {
    const {email,otp}=req.body;
    const check=await userSchema.findOne({$and:[{email:email},{otp:otp}]})
    if(!check)
        return res.status(403).send({msg:"Otp does not match"})
    return res.status(200).send({msg:"OTP matched successfully"})
}

export async function signUp(req,res) {
    try {
        const {email,username,password,cpassword}=req.body;
        console.log(email,username,password,cpassword);
        if(!(email&&username&&password&&cpassword))
            return res.status(404).send({msg:"fields are empty"});
        if(password!==cpassword)
            return res.status(404).send({msg:"password not matched"})
        bcrypt.hash(password,10).then((hashedPassword)=>{
            console.log(hashedPassword);
            userSchema.updateOne({email},{$set:{otp:"",username,password:hashedPassword}}).then(()=>{
                return res.status(201).send({msg:"success"});
            }).catch((error)=>{
                return res.status(404).send({msg:"Not registered"})
            })
        }).catch((error)=>{
            return res.status(404).send({msg:error}); 
        })

    } catch (error) {
        return res.status(404).send({msg:error});
    }
}

export async function signIn(req,res) {
    console.log(req.body);
    const {email,password}=req.body;
    if(!(email&&password))
        return res.status(404).send({msg:"feilds are empty"})
    const user=await userSchema.findOne({email})
    console.log(user);
    if(user===null)
        return res.status(404).send({msg:"invalid email"})

    //convert to hash and compare using bcrypt
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"})
    //generate token using sign(JWT key)
    const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"Succefully logged in",token})
}