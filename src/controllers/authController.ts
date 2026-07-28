import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { forgotPasswordSchema, loginSchema, registerSchema, resendOTPschema, resetPasswordSchema, verifyEmailSchema } from "../validations/authValidation.js";
import { prisma } from "../lib/prisma.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.js";
import type { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";
import { welcomeTemplate } from "../templates/welcomeTemplate.js";
import { generateOTP } from "../utils/otp.js";
import { otpTemplate } from "../templates/otpTemplate.js";
import { generateResetToken } from "../utils/resetToken.js";
import { forgotPasswordTemplate } from "../templates/passwordTemplate.js";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    const otp = generateOTP();
    await prisma.oTP.create({
      data: {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        userId: user.id,
      },
    });
    await sendEmail(
      user.email,
      "Verify Your Email",
      otpTemplate(user.name, otp),
    );
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email for the verification OTP.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if(!user.isVerified) {
        return res.status(403).json({
            success: false,
            message: "Please verify your email first"
        });
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    const refreshToken = generateRefreshToken(user.id);
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        ),
      },
    });
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

export const adminDashboard = (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Welcome Admin",
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    const decoded = verifyToken(refreshToken) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  await prisma.refreshToken.delete({
    where: { token: refreshToken },
  });
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// export const sendTestEmail = async (req: Request, res: Response) => {
//   try {
//     // const {email} = req.body;
//     await sendEmail(
//       user.email,
//       "Welcome to Elite Auth API",
//       welcomeTemplate(user.name),
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Email sent successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//     });
//   }
// };

export const verifyEmail = async (req:Request, res:Response) => {
    try {
        const data = verifyEmailSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const otpRecord = await prisma.oTP.findFirst({
            where: {
                userId: user.id,
                code: data.otp
            }
        });
        if(!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        if(otpRecord.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                isVerified: true
            },
        });
        await sendEmail(
          user.email,
          "Welcome to Elite Auth API",
          welcomeTemplate(user.name)
        );
        await prisma.oTP.delete({
            where: {
                id: otpRecord.id
            }
        });
        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const resendOTP = async (req:Request, res:Response) => {
    try {
        const data = resendOTPschema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });            
        }
        if(user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified"
            });
        }
        await prisma.oTP.deleteMany({
            where: {
                userId: user.id
            }
        });
        const otp = generateOTP();
        await prisma.oTP.create({
            data: {
                code: otp,
                userId: user.id,
                expiresAt: new Date(
                    Date.now() + 10 * 60 * 1000
                )
            }
        });
        await sendEmail(user.email, "Your New Verification OTP", 
            otpTemplate(user.name, otp)
        );
        return res.status(200).json({
            success: true,
            message: "A new OTP has been sent to your email."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internale server error"
        });
    }
};

export const forgotPassword = async (req:Request, res:Response) => {
    try {
        const data = forgotPasswordSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        await prisma.passwordResetToken.deleteMany({
            where: {
                userId: user.id
            }
        });
        const token = generateResetToken();
        await prisma.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt: new Date(
                    Date.now() + 15 * 60 *1000
                )
            }
        });
        const resetLink = `http://localhost:1213/reset-password?token=${token}`;
        await sendEmail(
            user.email, "Reset Your Password", forgotPasswordTemplate(user.name, resetLink)
        );
        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const resetPassword = async (req:Request, res:Response) => {
  try {
    const data = resetPasswordSchema.parse(req.body);
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: data.token
      },
      include: {
        user: true
      }
    });
    if(!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token"
      });
    }
    if(resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          id: resetToken.id
        }
      });
      return res.status(400).json({
        success: false,
        message: "Reset token has expired"
      });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.update({
      where: {
        id: resetToken.user.id
      },
      data: {
        password: hashedPassword
      }
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id
      }
    });
    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });    
  }
};
