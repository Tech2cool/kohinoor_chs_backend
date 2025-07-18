import { Router } from "express";
import flatModel from "../../models/flat.model.js";
import { errorRes, successRes } from "../../models/response.js";
import userModel from "../../models/user.model.js";
import { errorMessage } from "../../utils/constant.js";
import {
  comparePassword,
  createJwtToken,
  encryptPassword,
} from "../../utils/helper.js";
import config from "../../config/config.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => {
  try {
    const resp = await userModel.find();
    return res.send(
      successRes(200, "Users", {
        data: resp,
      })
    );
  } catch (error) {
    return res.send(errorRes(500, "Server Error"));
  }
});

userRouter.post("/user-add", async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    if (!name) return res.send(errorRes(401, "name Required"));
    // if (!email) return res.send(errorRes(401, "email Required"));
    if (!phoneNumber) return res.send(errorRes(401, "phone number Required"));
    if (!password) return res.send(errorRes(401, "Password Required"));

    const oldFlat = await userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (oldFlat) return res.send(errorRes(401, "Member Already Exist"));

    var id = `user-${name ?? ""}-${Date.now()}`.toLowerCase();

    const hashPassword = await encryptPassword(password);

    const newFlat = await userModel.create({
      ...req.body,
      _id: id,
      password: hashPassword,
      role: "admin",
    });

    const dataToken = {
      _id: newFlat._id,
      email: newFlat.email,
      role: newFlat.role,
    };

    const accessToken = createJwtToken(
      dataToken,
      config.SECRET_ACCESS_KEY,
      "15m"
    );
    const refreshToken = createJwtToken(
      dataToken,
      config.SECRET_REFRESH_KEY,
      "7d"
    );

    return res.send(
      successRes(200, "User added", {
        data: {
          ...newFlat._doc,

          accessToken,
          refreshToken,
        },
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

userRouter.post("/user-update/:id", authenticateToken, async (req, res) => {
  const { buildingNo, wing, flatNo, unitNo, name, phoneNumber } = req.body;
  try {
    if (!req.body) return res.send(errorRes(401, "Body Required"));

    const oldFlat = await flatModel.findOne({
      buildingNo: buildingNo,
      wing: wing,
      flatNo: flatNo,
    });

    if (!oldFlat) return res.send(errorRes(401, "not Exist"));

    const updatedData = await flatModel.findOneAndUpdate(
      { _id: oldFlat._id },
      { ...req.body }
    );

    return res.send(
      successRes(200, "flat Updated", {
        data: updatedData,
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

userRouter.post("/user-login", async (req, res, next) => {
  const body = req.body;
  const { email, password } = body;
  try {
    if (!body) return res.send(errorRes(403, "data is required"));
    if (!email) return res.send(errorRes(403, "email is required"));
    if (!password) return res.send(errorRes(403, "password is required"));

    const employeeDb = await userModel.findOne({
      email: email,
      role: { $ne: "resident" },
    });

    if (!employeeDb) {
      return res.send(errorRes(400, errorMessage.EMP_EMAIL_NOT_EXIST));
    }

    const hashPass = await comparePassword(password, employeeDb.password);

    if (!hashPass) {
      return res.status(400).json({ message: errorMessage.INVALID_PASS });
    }

    const { password: dbPassword, ...userWithoutPassword } = employeeDb._doc;
    const dataToken = {
      _id: employeeDb._id,
      email: employeeDb.email,
      role: employeeDb.role,
    };

    const accessToken = createJwtToken(
      dataToken,
      config.SECRET_ACCESS_KEY,
      "15m"
    );
    const refreshToken = createJwtToken(
      dataToken,
      config.SECRET_REFRESH_KEY,
      "7d"
    );

    await employeeDb.updateOne(
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    return res.send(
      successRes(200, errorMessage.EMP_LOGIN_SUCCESS, {
        data: {
          ...userWithoutPassword,
          accessToken,
          refreshToken,
        },
      })
    );
  } catch (error) {
    return next(error);
  }
});

export default userRouter;
