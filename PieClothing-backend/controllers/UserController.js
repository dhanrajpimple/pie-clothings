const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");
const cryptr = new Cryptr(process.env.SECRET_KEY);
require("dotenv").config();
const User = require("../models/User");
const { sendMail } = require("./mailController");
const { validateEmail } = require("../utils/common");

exports.signup = async (req, res) => {
  try {
    let { firstName, lastName, phone, email, password, AccountType } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    let hashedpassword;
    try {
      hashedpassword = await cryptr.encrypt(password);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    if (AccountType == null) {
      AccountType = "user";
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedpassword,
      AccountType,
    });

    return res.status(200).json({
      success: true,
      message: "user create successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "user can not create",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please enter the valid email",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.AccountType,
    };

    const decryptedString = cryptr.decrypt(user.password);

    if (decryptedString == password) {
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      userDetails = user.toObject();
      userDetails.token = token;
      userDetails.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        userDetails,
        message: "user logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password not match",
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};

exports.checkIsAdmin = async (req, res) => {
  try {
    const uid = req.body.uid;
    const userDetail = await User.findById(uid);
    // console.log(userDetail);

    if (userDetail?.AccountType == "admin") {
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  } catch (err) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.allUser = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.body;
    await User.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email not found.",
      });
    }

    if (otp == existingUser.extradetails.otp) {
      const hash = await cryptr.encrypt(password);
      const updatedUser = await User.findByIdAndUpdate(existingUser?._id, {
        password: hash,
      });
      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP",
      });
    }
  } catch (err) {
    console.log("verifyOTP err", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


exports.resetPassSendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email not found.",
      });
    }

    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const updatedUser = await User.findByIdAndUpdate(existingUser?._id, {
      extradetails: {
        otp: otp,
      },
    });

    sendMail(
      email,
      "OTP for reset password",
      `Hey ${existingUser?.fname} ${existingUser?.lname},
Your otp for change password is: ${otp}.

Thanks and Regards.
    `
    );

    setTimeout(async () => {
      await User.findByIdAndUpdate(existingUser?._id, {
        extradetails: {
          otp: undefined,
        },
      });
    }, 1000 * 60 * 1);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log("catch err", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
