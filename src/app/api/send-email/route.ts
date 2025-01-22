import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const OAuth2 = google.auth.OAuth2;

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const emailContent = `From: ${process.env.EMAIL_USER}
To: ${process.env.EMAIL_TO}
Subject: New message from your portfolio

Name: ${name}
Email: ${email}
Message: ${message}`;

  const encodedEmail = Buffer.from(emailContent)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const gmailResponse = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log("Message sent:", gmailResponse.data);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to send email", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to send email", error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
