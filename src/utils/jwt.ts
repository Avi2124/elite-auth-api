import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
// export const generateAccessToken = (
//     id: string,
//     email: string,
//     role: string
// ) => {
//     return jwt.sign({
//         id, email, role
//     }, JWT_SECRET, {
//         algorithm: "HS256",
//         expiresIn: process.env.JWT_EXPIRES_IN!
//     });
// };

export const generateRefreshToken = (id:string) => {
    return jwt.sign({id}, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "7d"
    });
};

export const generateAccessToken = (
    id:string,
    email: string,
    role: string
) => {
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn: "15m"
    };
    return jwt.sign(
        {id, email, role},
        JWT_SECRET,
        options
    );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};