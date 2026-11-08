import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

type EmailType = "VERIFY" | "RESET";

export const sendEmail = async ({
  email,
  emailType,
  userID,
}: {
  email: string;
  emailType: EmailType;
  userID: string;
}) => {
  try {
    // Create a hashed token
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "arhamneyazi2006@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser: 
      <br> 
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const sendMail = await transport.sendMail(mailOptions);
    return sendMail;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
};
