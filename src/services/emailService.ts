import { transporter } from "../config/mail.js";

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    return transporter.sendMail({
        from : `"Elite Auth API" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    });
};