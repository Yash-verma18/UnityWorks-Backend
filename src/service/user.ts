import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/authentication";
import { User } from "../model/user";
const jwt = require("jsonwebtoken");

// auth.ts

export const Login = async (req: any, res: any) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Use await to ensure User.findOne() is completed before proceeding
    const user = await User.findOne({ email, password });

    if (!user) {
      // If the user is not found, send a 400 status with a message and return
      return res.status(400).json({
        Status: "Error",
        message: "User does not exist",
      });
    }

    // If the user is found, create an access token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Send a JSON response with the access token and a success message
    res.status(200).json({
      Status: "OK",
      data: {
        accessToken,
        refreshToken,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error", error);
    // If there's an error, send a 500 status with an error message
    res.status(500).json({
      Status: "Error",
      message: "Error during login",
    });
  }
};

export const Signup = async (req: any, res: any) => {
  try {
    const {
      acceptTerms,
      accountType,
      password,
      email,
      dob,
      companyName,
      numberOfEmployees,
    } = req.body;

    if (!password || !email) {
      return res.status(400).send("Invalid input");
    }

    const ifUserExists = await User.findOne({ email });

    if (ifUserExists) {
      return res.status(400).send("User already exists");
    }

    const username = email.split("@")[0];

    const newUser = new User({
      email,
      password,
      username,
      dob,
      accountType,
      companyName,
      acceptTerms,
      numberOfEmployees,
    });

    newUser.save();

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    res.status(200).send({
      Status: "OK",
      data: {
        accessToken,
        refreshToken,
      },
      message: "User created",
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).send({
      Status: "Error",
      message: "Error in creating user",
    });
  }
};
