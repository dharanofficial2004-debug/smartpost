"use server";

import nodemailer from 'nodemailer';

export async function submitEmailForm(email: string) {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return { success: false, error: 'Valid email is required.' };
    }

    try {
        // We will need environment variables to securely connect to the SMTP server.
        // For example, if using Gmail, we'd need EMAIL_USER and EMAIL_APP_PASSWORD.
        // Or a service like SendGrid, Resend, or AWS SES.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // The email is sent FROM the authenticated account, TO the target inbox.
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'hello@smartpost.co.in',
            subject: 'New Beta Access Request - SmartPost',
            text: `You have a new beta access request from: ${email}`,
            html: `<p>You have a new beta access request from: <strong>${email}</strong></p>`
        };

        const result = await transporter.sendMail(mailOptions);

        if (result.accepted.length > 0) {
            return { success: true };
        } else {
            return { success: false, error: 'Failed to send email. Please try again later.' };
        }

    } catch (error) {
        console.error('Email submission error:', error);
        return { success: false, error: 'Server error. Please ensure SMTP credentials are configured.' };
    }
}
