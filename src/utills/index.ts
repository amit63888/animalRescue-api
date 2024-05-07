import nodemailer from 'nodemailer'
import yenv from "yenv"; 
const env = yenv("env.yaml", { env: "development" }); 
export const generateOTP = () => {
    const otpLength = 10;
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };


  export const sendEmail = async (to:any, subject:any, text:any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: env.MAIL_HOST,
            port: env.MAIL_PORT,
            secure: false,
            auth: {
                   user:env.MAIL_USERNAME,
                   pass:env.MAIL_PASSWORD
                }
        });
        const mailOptions = {
            from:env.MAIL_USERNAME ,
            to: `${to}`,
            subject: subject,
            text: " ",
            html: "<p> click below, To Reset <a href='https://techwagger.com/reset-password/" + text + "'> click here,</a></p>"
  //
        };
         await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
  };

  export function removeDuplicates(array: any[]) {
    const uniqueArray = Array?.from(new Set(array?.map(item => item?.toLowerCase())));
    return uniqueArray?.map(item => array?.find(element => element?.toLowerCase() === item));
  }
  