import { Router } from "express";
import alunos from  '../controllers/alunos.controller';

const router = new Router();

router.get('/', alunos.index);

export default router;