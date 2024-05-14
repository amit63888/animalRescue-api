import nodemailer, { Transporter } from 'nodemailer';
 
export const generateOTP = () => {
    const otpLength = 10;
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };


  export const sendEmail = async (to: any, subject: any, text: any,hyperText:any) => {
    try {
        const transporter: Transporter<unknown> = nodemailer.createTransport({
            host: process.env.MAIL_HOST!,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME!,
                pass: process.env.MAIL_PASSWORD!
            }
        });
        const mailOptions = {
            from: process.env.MAIL_USERNAME!,
            to: `${to}`,
            subject: subject,
            text: " ",
            html:hyperText 
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
  //localhost:4610/auth/v1/changepassword

  export const loginDetailsForResponse = (loginDetail: any, userDetail: any) => {
    return {
        userId: loginDetail?.userId,
        email: loginDetail?.email,
        role: userDetail?.roleId?.role,
        permissions: userDetail?.roleId?.permissions, 
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        phone: userDetail?.phone, 
        photo: userDetail?.photo,
        radius: userDetail?.radius,
        token: loginDetail?.token,
        location: userDetail?.location,
        currentLogin: loginDetail?.currentLogin,
        currentLoginTime: loginDetail?.currentLoginTime,
        lastLogin: loginDetail?.lastLogin,
        lastLoginTime: loginDetail?.lastLoginTime,
        createdAt: userDetail?.createdAt,
        updatedAt: userDetail?.updatedAt
    };
};
