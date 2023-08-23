const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { PORT = 3000 } = process.env;

const signup = async (req, res) => {
  const { 
    email, 
    password, 
    subscription = "starter", 
    verify = false, 
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });

  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const link = `http://localhost:${PORT}/api/auth/verify/${verificationToken}`;

  const verificationEmail = {
    to: email,
    subject: "Email verification from Contacts service",
    html: `<p>Click on the link to verify your email address: <a target="_blank" href=${link}>VERIFICATION LINK</a></p>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    status: "Success",
    code: 201,
    message: "User was created",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarPath: avatarURL,
        verify,
        verificationToken,
      },
    },
  });
};

module.exports = signup;