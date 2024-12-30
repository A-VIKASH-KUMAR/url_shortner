import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export default function (req: any, res: any, updatedUser: any) {
    
    let jwtSignValue: any = {
      uid: updatedUser.googleId,
      email:updatedUser.email,
      firstName:updatedUser.firstName
    };
  
    let accessToken = jwt.sign(jwtSignValue, process.env.JWT_SECRET_KEY!, {
      expiresIn: "5m",
    });
  
    let refreshToken = jwt.sign(jwtSignValue, process.env.JWT_SECRET_KEY!, {
      expiresIn: "24h",
    });

    // Attach tokens to the response locals object for further use
    res.locals.access = accessToken;
    res.locals.refresh = refreshToken;
  
    req.user = jwtSignValue;
    return {accessToken, refreshToken}
  }
  