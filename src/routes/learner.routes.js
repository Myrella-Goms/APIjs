import { Router } from "express";
import learners from "../controllers/learners.controller";
import loginRequired from "../middlewares/login.required";

const router = new Router();

router.get("/getById/:id", learners.getById);
router.post("/create", loginRequired, learners.create);
router.post("/createBulk", learners.createBulk);
router.put("/update/:id", loginRequired, learners.update);
router.delete("/delete/:id", loginRequired, learners.deleteLearner);

export default router;
