export const otpTemplate = (name: string, otp: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta carset="UTF-8">
        <title>Email Verification</title>
    </head>
    <body style="background:#f4f4f4; font-family: Arial, sans-serif; padding: 40px;">
    <div style="max-width:600px; margin: auto; background: white; border-radius: 10px; padding: 30px;">
    <h2 style="color:#2563eb;">
        Hello ${name},
    </h2>
    <p>Thank you for registering with Elite Auth API.</p>
    <p>Use the following OTP to verify your email:</p>
    <div style="text-align:center; font-size:32px; font-weight:bold; letter-spacing: 8px; background:#eef4ff; color: #2563eb;
        padding:20px; border-radius:8px; margin:20px 0;">
            ${otp}
    </div>
    <p>This OTP will expire in <strong>10 minutes</strong>.</p>
    <p>If you didn't create this account, you can safely ignore this email.</p>
    <hr>
    <small>Elite Auth API</small>
    </div>
    </body>
    </html>
    `;
};
