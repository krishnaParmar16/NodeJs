const nodemailer=require("nodemailer");
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
         user:"kp497485@gmail.com",
         pass:"kkhoxyczisblvaax"
    }
})

module.exports.sendOTP=(to,otp)=>{
    let mailOptions={
        to:to,
        from:"kp497485@gmail.com",
        subject:"Password Reset OTP",
        text:`Your Password Reset OTP is ${otp}`
    }

    transport.sendMail(mailOptions);
}