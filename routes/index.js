import express from "express";
import { shortenerController } from '../controllers/Shortener.js';
const router = express.Router();

router.route('/:code').get((req, res) => shortenerController.openMain(req, res));

export default router;
