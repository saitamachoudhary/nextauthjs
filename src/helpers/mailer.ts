import nodemailer from 'nodemailer';


export const sendEmail=async({email,emailType,userID})=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mail={
            from: 'bar@example.com', // sender address
            to: email, // list of receivers
            subject:  , // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }
    } catch (error) {
        
    }
}