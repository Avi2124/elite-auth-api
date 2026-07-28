export const welcomeTemplate = (name: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
    </head>
    <body style="font-family:Arial, sans-serif; background:#f4f4f4; padding:40px;">
        <div style="max-width:600px; margin: auto; background: white; padding: 30px; border-radius: 10px">
        <h1 style="color:#2563eb;">
            Welcome ${name}
        </h1>
        <p>Thank you for registering with Elite Auth API.</p>
        <p>Your account has been created successfully.</p>
        <hr>
        <small>This is an automated email.</small>
        </div>
    </body>
    </html>
    `;
};