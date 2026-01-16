import { Router } from "express";
import auth from  '../controllers/auth.controller';

const router = new Router();

router.post('/', auth.createToken);

export default router;