import jwt from "jsonwebtoken";
interface JwtPayload {
    exp: number;
    iat: number;
  }
export const validateRegister = (req:any, res:any, next:any) => {
    const {email, password} = req.body;

    if (!email || !password || email === "" ||password === "") {
        return res.status(403).json({error:"Please provide email and password to register"})
    }
    return next()
}

export const validateLogin = (req:any, res:any, next:any) => {
    return next()
}
function getAccessToken(userInfo: any) {
    const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY!, {
      expiresIn: "5m",
    });
  
    return token;
  }
  
  //Function to get the refresh token
  function getRefreshToken(userInfo: any) {
    const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY!, {
      expiresIn: "24h",
    });
  
    return token;
  }
export const validateToken = (req:any, res:any, next:any) => {
    try {
        if (!req.headers.authorization) {
          return res
            .status(403)
            .json({ status: "forbidden", message: "Access denied!" });
        }
    
        const token = req.headers.authorization.replace("Bearer ", "");
    
        if (!token) {
          return res
            .status(500)
            .json({ status: "error", message: "Token not found in request" });
        }
    
        const { exp, iat, ...userDetail } = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY!
        ) as JwtPayload;
    
        if (!userDetail) {
          return res
            .status(498)
            .json({ status: "error", message: "Invalid Token" });
        }
    
        const accessToken = getAccessToken(userDetail); // Function to retrieve access token from request
        const refreshToken = getRefreshToken(userDetail); // Function to retrieve refresh token from request
    
        // Attach tokens to the response locals object for further use
        res.locals.access = accessToken;
        res.locals.refresh = refreshToken;
    
        req.user = userDetail;
        return next();
      } catch (error) {
        console.error("error occored to validate", error);
        return res.status(500).json({ error: "error occoured in authenticate" });
      }
}