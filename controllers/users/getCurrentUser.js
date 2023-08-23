const getCurrentUser = async (req, res) => {
    const { email, subscription, avatarURL, verify } = req.user;
  
    res.json({
      code: 200,
      status: "OK",
      userData: {
        email,
        subscription,
        avatarURL,
        verify,
      },
    });
  };
  
  module.exports = getCurrentUser;