const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role)
      return res.status(401).json({ message: "Unauthorized access" });
    const rolesArray = [...allowedRoles];
    const result = req.role
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      return res.status(401).json({ message: "Unauthorized access" });
    next();
  };
};

export default verifyRole;
