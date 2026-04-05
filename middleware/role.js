const roles= {
  admin: ["create", "read", "update", "delete"],
  analyst: ["read"],
  viewer: ["read"],
};

const authorize = (action) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (!roles[role].includes(action)) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    next();
  };
};

export default authorize;