import { Router } from "express";
import { errorRes, successRes } from "../../models/response.js";
import chronoModel from "../../models/chronology.model.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const chronologyRouter = Router();

chronologyRouter.get("/chronology", async (req, res) => {
  try {
    const resp = await chronoModel.find().sort({ date: 1 });
    return res.send(
      successRes(200, "chronology", {
        data: resp,
      })
    );
  } catch (error) {
    return res.send(errorRes(500, "Server Error"));
  }
});

chronologyRouter.post(
  "/chronology-add",
  authenticateToken,
  async (req, res) => {
    const { title, date, docs } = req.body;
    try {
      if (!title) return res.send(errorRes(401, "title Required"));

      const oldChrono = await chronoModel.findOne({
        title: title,
      });

      if (oldChrono) return res.send(errorRes(401, "Chronlogy Already Exist"));

      const newChrono = await chronoModel.create({
        ...req.body,
      });

      return res.send(
        successRes(200, "chronology added", {
          data: newChrono,
        })
      );
    } catch (error) {
      console.log(error);
      return res.send(errorRes(500, "Server Error"));
    }
  }
);

chronologyRouter.post(
  "/chronology-update/:id",
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;
    try {
      if (!req.body) return res.send(errorRes(401, "Body Required"));

      const oldChrono = await chronoModel.findById(id);

      if (!oldChrono) return res.send(errorRes(401, "not Exist"));

      const updatedData = await chronoModel.findOneAndUpdate(
        { _id: oldChrono._id },
        { ...req.body }
      );

      return res.send(
        successRes(200, "Chronology Updated", {
          data: updatedData,
        })
      );
    } catch (error) {
      console.log(error);
      return res.send(errorRes(500, "Server Error"));
    }
  }
);

chronologyRouter.delete(
  "/chronology-delete/:id",
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) return res.send(errorRes(401, "no id"));

      await chronoModel.findByIdAndDelete(id);

      return res.send(
        successRes(200, "Chronology deleted", {
          data: true,
        })
      );
    } catch (error) {
      console.log(error);
      return res.send(errorRes(500, "Server Error"));
    }
  }
);

export default chronologyRouter;
