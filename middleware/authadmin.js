const authorizeadmin = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Only admin can access this" });
    }
    next();
  };
};

export default authorizeadmin;