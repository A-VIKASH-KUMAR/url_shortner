import { google } from "googleapis";
import dotenv from "dotenv";
import { Request } from "express";
import { User } from "../models/auth.model";
import createToken from "../utils/token"
dotenv.config();
import axios from "axios";
// type Request = {
//   body: any;
//   user: any;
//   headers:any;
// };
interface Requestextend extends Request {
  body: any;
  user: any;
  headers: any;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  redirectUri
);

export const googlelogin = async (req: Requestextend, res: any) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    return res.status(200).json({ data: authUrl });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};
export const googleUser = async (req: Request, res: any) => {
  try {
    // console.log("req",req)
    const authorizationCode: any = req.query.code;
    const { tokens }: any = await oauth2Client.getToken(authorizationCode);
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => res.data)
      .catch((error: any) => {
        console.error(`Failed to fetch user`, error);
        throw new Error(error);
      });

    const create_user_response = await User.findOneAndUpdate(
      { email: googleUser.email },
      {
        $set: {
          email: googleUser.email,
          
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          googleId: googleUser.id,
          pictureUrl: googleUser.picture,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      },
      { upsert: true, new: true }
    );
    console.log("create user response", create_user_response);
    const jwtTokens = createToken(req,res, create_user_response)
    return res.redirect(`/api/url-shortner/dashboard?token=${jwtTokens.accessToken}`);
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};

export const validateToken = async (req: Request, res: any) => {
  try {
    const authorizationCode = req.body.code;
    const { tokens } = await oauth2Client.getToken(authorizationCode);
    oauth2Client.setCredentials(tokens);

    const payload = {
      type: "authorized_user",
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
    };
    return res.status(200).json({ data: googleUser });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};
