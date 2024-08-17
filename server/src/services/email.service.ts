import nodemailer from 'nodemailer';


export class EmailService {

    private transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: "priyareji25@gmail.com",
            pass: "tnmjnixyysnlkjtn",
        },
        tls: {
            rejectUnauthorized: false
          }
    });

    async sendPasswordResetEmail(to:string,resetToken:string):Promise<void>{
        const resetUrl = `${process.env.ORIGIN}/reset-password?token=${resetToken}`;
        const mailOptions={
            from: "priyareji25@gmail.com",
            to,
            subject:'Password Reset',
            text:`You requested a password reset.Click the following link to reset your password: ${resetUrl}`,
            html:`<p>You requested a password reset.Click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,

        }
        await this.transporter.sendMail(mailOptions);
    }
}

//export default new EmailService();