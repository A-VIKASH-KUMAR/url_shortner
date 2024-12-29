import express from "express";
import authRoute from "./routes/auth.route";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import swaggerRoute from "./utils/swagger";
dotenv.config();
const app = express();
const port = 3001;
app.use(bodyParser.json());

app.get("/", function (req: any, res: any) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server is running on port http://localhost:" + port);
});

app.use(express.json());
app.use("/api/auth", authRoute);