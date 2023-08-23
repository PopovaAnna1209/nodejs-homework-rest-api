const express = require("express");
const { auth: authCtrl } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchemas } = require("../../models");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.register),
  authCtrl.signup
);

authRouter.post("/login", validateBody(userSchemas.login), authCtrl.signin);

authRouter.post("/logout", authenticate, authCtrl.signout);

authRouter.get("/verify/:verificationToken", authCtrl.verifyEmail);

authRouter.post("/verify", validateBody(userSchemas.verification), authCtrl.resendEmail);

module.exports = authRouter;