import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Log env status (safely checking presence)
    console.log("API send-email endpoint hit.");
    console.log("Env check - SMTP_HOST:", process.env.SMTP_HOST, "SMTP_USER:", process.env.SMTP_USER);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP Configuration variables are missing.");
      return NextResponse.json(
        { message: "SMTP configuration is incomplete in server environment variables" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: 'New message from your portfolio',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email in route handler:", error);
    return NextResponse.json(
      { 
        message: "Failed to send email", 
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      },
      { status: 500 }
    );
  }
}
