const { NotFound, BadRequest } = require("http-errors");

const { User } = require("../../models");
const sendEmail = require("../../helpers/sendEmail");
const { PORT = 3000 } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
  }

  if (user.verify) {
    throw BadRequest("Verification has already been passed");   
  }

  const link = `http://localhost:${PORT}/api/auth/verify/${user.verificationToken}`;

  const verificationEmail = {
    to: user.email,
    subject: "Repeated email verification from Contacts service",
    html: `<p>Click on the link to verify your email address: <a target="_blank" href=${link}>VERIFICATION LINK</a></p>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    status: "OK",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendEmail;