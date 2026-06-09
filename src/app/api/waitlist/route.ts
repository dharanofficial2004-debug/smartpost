import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to the subscriber (Confirmation)
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM || `"SmartPost AI" <noreply@gmail.com>`,
      to: email,
      subject: 'You are on the waitlist! - SmartPost AI',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #ff4500;">Hi ${name},</h2>
          <p>Thank you for joining the waitlist for <strong>SmartPost AI</strong> - the AI-powered Reddit marketing and lead generation platform!</p>
          <p>We've successfully added you to our list. We will send you an email as soon as we launch and grant you early access.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">You received this because you signed up on the SmartPost AI waitlist.</p>
        </div>
      `,
    };

    // Email to the owner (Notification)
    const notificationMailOptions = {
      from: process.env.SMTP_FROM || `"SmartPost AI Waitlist" <noreply@gmail.com>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: 'New Waitlist Signup: SmartPost AI',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #ff4500;">New Waitlist Signup!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // Send confirmation email to subscriber
    await transporter.sendMail(confirmationMailOptions);
    
    // Send notification email to owner
    if (process.env.SMTP_TO || process.env.SMTP_USER) {
      await transporter.sendMail(notificationMailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send waitlist confirmation' },
      { status: 500 }
    );
  }
}
