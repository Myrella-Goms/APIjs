import { Router } from "express";
import home from  '../controllers/home.controller';

const router = new Router();

router.get('/', home.index);

export default router;