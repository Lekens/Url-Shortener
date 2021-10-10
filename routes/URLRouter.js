import express from "express";
import { shortenerController } from '../controllers/Shortener.js';
const URLRouter = express.Router();

URLRouter.route(`/list`)
    .get((req, res, next) => shortenerController.list(req, res, next));
URLRouter.route(`/encode`)
    .post((req, res, next) => shortenerController.encode(req, res, next));
URLRouter.route(`/decode`)
    .post((req, res, next) => shortenerController.decode(req, res, next));
URLRouter.route(`/statistic/:url`)
    .post((req, res, next) => shortenerController.decode(req, res, next));
export default URLRouter;
