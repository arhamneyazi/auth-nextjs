import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // 1. The Waiter arrives: Grab the email from the frontend request
    const reqBody = await request.json();
    const { email } = reqBody;

    // 2. Check the Guest List: Does a user with this email actually exist?
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }

    // 3. Call the Mailroom: Send the reset email
    await sendEmail({
      email,
      emailType: "RESET",
      userID: user._id.toString(),
    });

    // 4. Success: Tell the frontend the email was sent
    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
