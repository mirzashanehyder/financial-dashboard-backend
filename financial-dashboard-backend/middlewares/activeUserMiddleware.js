export const checkActiveUser = (req, res, next) => {
  try {
    if (req.user.status === "inactive") {
      return res.status(403).json({
        message: "User account is inactive",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error checking user status",
    });
  }
};