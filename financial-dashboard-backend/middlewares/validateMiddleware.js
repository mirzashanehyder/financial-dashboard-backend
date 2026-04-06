export const validateRecord = (req, res, next) => {
    const { amount, type, category, date } = req.body;
  
    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }
  
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Type must be income or expense",
      });
    }
  
    next();
  };

  // User validation
  export const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }
  
    next();
  };