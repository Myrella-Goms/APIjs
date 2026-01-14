import { Router } from "express";
import token from  '../controllers/token.controller';

const router = new Router();

router.post('/', token.createToken);

export default router;