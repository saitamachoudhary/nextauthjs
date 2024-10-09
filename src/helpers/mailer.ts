import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000
      })
    }
    else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpire: Date.now() + 3600000
      })
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d2b8464bcf8342",
        pass: "fc551ee5939cf8"
      }
    });
    const mailOptions = {
      from: 'bar@example.com', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? 'veirfy your email' : 'reset your password', // Subject line
      text: "Hello world?", // plain text body
      html: "<p>Hello world?</p>", // html body
    }
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error:any) {
   throw new Error(error.message);
  }
}