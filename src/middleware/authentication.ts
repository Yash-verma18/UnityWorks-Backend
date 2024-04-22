const jwt = require("jsonwebtoken");

export const authenticateAccessToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Authorization token missing",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      let errorMessage = "Invalid token";

      if (err.name === "TokenExpiredError") {
        errorMessage = "Token has expired";
      }
      return res.status(200).json({
        status: "error",
        message: errorMessage,
      });
    }
    req.user = user;
    next();
  });
};

const generateNewTokens = async (oldRefreshService: any) => {
  const refreshToken = generateRefreshToken(oldRefreshService);
  const accessToken = generateAccessToken(oldRefreshService);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const generateRefreshToken = (id: any) => {
  const data = {
    id,
  };
  const options = {
    expiresIn: "1d",
  };
  const accessToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, options);
  return accessToken;
};

export const generateAccessToken = (id: any) => {
  const data = {
    id,
  };
  const options = {
    expiresIn: "1m",
  };

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, options);
  return accessToken;
};

export const refreshController = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await generateNewTokens(refreshToken);
    res.status(200).send(newTokens);
  } catch (err: any) {
    res.status(409).send("Error occured during refresh");
  }
};
