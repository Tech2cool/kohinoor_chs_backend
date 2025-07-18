import config from "../config/config.js";
import { errorRes, successRes } from "../models/response.js";
import userModel from "../models/user.model.js";
import { createJwtToken, verifyJwtToken } from "../utils/helper.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    // const refreshToken = req.headers.refreshtoken?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"]?.split(" ")[1];
    // console.log(`acces: ${accessToken} `);
    // console.log(`refresh: ${refreshToken} `);
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
      const decoded = verifyJwtToken(accessToken, config.SECRET_ACCESS_KEY);
      let user = null;
      if (decoded.data.role === "admin") {
        user = await userModel.findById(decoded.data._id).lean();

        if (!user) {
          return res.send(errorRes(401, "Channel Partner not found"));
        }
      }
      if (!user) {
        return res.send(errorRes(401, "No valid Session found"));
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Token has expired, attempt to refresh
        if (!refreshToken) {
          return res.send(errorRes(401, "Refresh token not found"));
        }

        try {
          const decoded = verifyJwtToken(
            refreshToken,
            config.SECRET_REFRESH_KEY
          );
          let user = null;
          if (decoded.data.role === "admin") {
            user = await userModel.findById(decoded.data._id).lean();

            if (!user) {
              return res.send(errorRes(401, "No User not found"));
            }
          }

          if (!user) {
            return res.send(errorRes(401, "No valid Session found"));
          }
          const { password, ...userWithoutPassword } = user;
          const dataToken = {
            _id: user._id,
            email: user.email,
            role: user.role,
          };

          const newAccessToken = createJwtToken(
            dataToken,
            config.SECRET_ACCESS_KEY,
            "15m"
          );

          res.setHeader("Authorization", `Bearer ${newAccessToken}`);
          // res.setHeader("NewAccessToken", `Bearer ${newAccessToken}`);
          req.user = {
            ...userWithoutPassword,
          };
          return next();
        } catch (refreshError) {
          return res.send(errorRes(401, "Invalid refresh token"));
        }
      }
      return res.send(errorRes(401, "Invalid token"));
    }
  } catch (error) {
    return res.send(errorRes(401, "Internal server error"));
  }
};
