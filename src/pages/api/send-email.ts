import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const OAuth2 = google.auth.OAuth2;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

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
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Detailed error:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to send email", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Failed to send email",
            error: "An unknown error occurred",
          });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
