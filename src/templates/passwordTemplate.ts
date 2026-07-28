export const forgotPasswordTemplate = (name: string, resetLink: string) => {
    return `
    <h2>Hello ${name}</h2>
    <p>Click the button below to reset your password.</p>
    <p><a href="${resetLink}" style="background:#2563eb; color:white; padding: 12px 20px; text-decoration:none; border-radius:6px;">
        Reset Password</a></p>
    <p>This link expires in 15 minutes.</p>
    `;
};
