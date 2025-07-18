import { Router } from "express";
import flatModel from "../../models/flat.model.js";
import { errorRes, successRes } from "../../models/response.js";
import { fileURLToPath } from "url";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import otpModel from "../../models/otp.model.js";
import axios from "axios";
import { generateOTP } from "../../utils/helper.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flatRouter = Router();

flatRouter.get("/flats", async (req, res) => {
  try {
    const resp = await flatModel.find();
    return res.send(
      successRes(200, "flats", {
        data: resp,
      })
    );
  } catch (error) {
    return res.send(errorRes(500, "Server Error"));
  }
});

flatRouter.post("/flat-add", authenticateToken, async (req, res) => {
  const { buildingNo, floor, flatNo, unitNo, name, phoneNumber, society } =
    req.body;
  try {
    if (!buildingNo) return res.send(errorRes(401, "Building No Required"));
    if (!floor) return res.send(errorRes(401, "floor Required"));
    if (!flatNo) return res.send(errorRes(401, "Flat No Required"));
    if (!phoneNumber) return res.send(errorRes(401, "phone number Required"));

    const oldFlat = await flatModel.findOne({
      buildingNo: buildingNo,
      floor: floor,
      flatNo: flatNo,
    });

    if (oldFlat) return res.send(errorRes(401, "Member Already Exist"));

    var id =
      `vasundhara-${society}-${buildingNo}-${floor}-${flatNo}`.toLowerCase();

    const newFlat = await flatModel.create({
      ...req.body,
      _id: id,
    });

    return res.send(
      successRes(200, "flat added", {
        data: newFlat,
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

flatRouter.post("/flat-update/:id", authenticateToken, async (req, res) => {
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

flatRouter.post("/flat-updates", async (req, res) => {
  const results = [];
  const dataTuPush = [];
  const csvFilePath = path.join(__dirname, "vasundhara_flat_list.csv");

  if (!fs.existsSync(csvFilePath)) {
    return res.status(400).send("CSV file not found");
  }
  let i = 0;

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      for (const row of results) {
        const {
          Name: name,
          building,
          floor,
          "flat no": flat,
          "Contact No.": phoneNumber,
          unitNo,
        } = row;

        const buildingNo = building
          ?.toLowerCase()
          ?.replace("c", "")
          ?.replace(":", "");
        const society = "C";
        const newPhone = phoneNumber?.split(",")[0];

        var id =
          `vasundhara-${society}-${buildingNo}-${floor}-${flat}`.toLowerCase();

        dataTuPush.push({
          _id: id,
          name: name?.trim(),
          society,
          // building,
          buildingNo: parseInt(buildingNo),
          floor: parseInt(floor),
          flatNo: parseInt(flat),
          phoneNumber: newPhone ? parseInt(newPhone) : 0,
          unitNo,
        });
      }
      // await flatModel.insertMany(dataTuPush);
      // Send the results only after processing is done
      return res.send(dataTuPush);
    })
    .on("error", (err) => {
      return res.status(500).send({ error: err.message });
    });
});
flatRouter.post("/flat-otp-generate", async (req, res, next) => {
  const { name, email, society, phoneNumber, docId, flatNo } = req.body;
  try {
    console.log(req.body);

    const findOldOtp = await otpModel.findOne({
      $or: [{ phoneNumber: phoneNumber }],
    });
    let url = "https://hooks.zapier.com/hooks/catch/9993809/286pnju/";
    if (findOldOtp) {
      // url += `?otp=${findOldOtp.otp}&phoneNumber=${encodeURIComponent(
      //   "+91"
      // )}${phoneNumber}&name=${encodeURIComponent(name)}&flatNo=${flatNo}`;
      url += `?otp=${findOldOtp.otp}&phoneNumber=${encodeURIComponent(
        "+91"
      )}${phoneNumber}&name=${encodeURIComponent(
        name
      )}&flatNo=${encodeURIComponent(flatNo)}`;

      const resp = await axios.post(url);
      console.log(url);
      console.log(resp.data);
      return res.send(
        successRes(200, "otp Sent to Client", {
          data: findOldOtp,
        })
      );
    }

    const newOtp = generateOTP(4);
    const newOtpModel = new otpModel({
      otp: newOtp,
      docId: docId,
      email: email ?? "noemailprovided2026625@gmail.com",
      phoneNumber: phoneNumber,
      type: "vasundhara-login-otp",
      message: "Vasundhara Login Verification Code",
    });
    const savedOtp = await newOtpModel.save();
    url += `?otp=${savedOtp.otp}&phoneNumber=${encodeURIComponent(
      "+91"
    )}${phoneNumber}&name=${encodeURIComponent(
      name
    )}&flatNo=${encodeURIComponent(flatNo)}`;
    console.log(url);

    const resp = await axios.post(url);
    console.log(resp.data);

    return res.send(
      successRes(200, "otp Sent to Client", {
        data: savedOtp,
      })
    );
  } catch (error) {
    return next(error);
  }
});

flatRouter.post("/flat-otp-verify", async (req, res, next) => {
  const { phoneNumber, otp, email } = req.body;
  try {
    if (!otp) return res.send(errorRes(401, "Invalid Otp"));

    const otpExist = await otpModel.findOne({
      $or: [{ phoneNumber: phoneNumber }, { email: email }],
    });

    if (!otpExist) return res.send(errorRes(404, "Otp is Expired"));

    if (otp != otpExist.otp)
      return res.send(errorRes(401, "Otp Didn't matched"));

    await otpExist.deleteOne();

    return res.send(
      successRes(200, "otp Verified Successfully", {
        data: true,
      })
    );
  } catch (error) {
    return res.send(errorRes(404, "Server Internal Error"));
  }
});

export default flatRouter;
