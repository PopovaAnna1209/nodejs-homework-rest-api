const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!user || !passwordCompare) {
    throw new Unauthorized("Email or password is invalid");
  }

  if (!user.verify) {
    throw new Unauthorized("Email is not verified");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "OK",
    code: 200,
    message: "Login success",
    data: {
      token,
      userData: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
        verify: user.verify,
      },
    },
  });
};

module.exports = signin;