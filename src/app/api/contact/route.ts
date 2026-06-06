// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Create Ethereal test account
    const testAccount = await nodemailer.createTestAccount();

    console.log({ testAccount });

    // Create transporter with Ethereal
    const transporter = nodemailer.createTransport({
      ...testAccount.smtp,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send mail
    const mailOptions = {
      from: `"Park Buddy" <${testAccount.user}>`,
      to: email, // Send to self
      subject: "Thanks for contacting us",
      html: `
        <h2>Thanks for contacting us</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>

        <div>We have revieved your message and will contact you soon.</div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Email sent successfully",
      previewUrl: nodemailer.getTestMessageUrl(info), // 👈 Preview link
    });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
