import express from "express";
import { shortenerController } from '../controllers/Shortener.js';
import { controllerService } from "../services/controller.service.js";
const URLRouter = express.Router();

URLRouter.route(`/list`)
    .get(
        (req, res, next) => controllerService.checkAPIKey(req, res, next),
        (req, res, next) => shortenerController.list(req, res));
URLRouter.route(`/encode`)
    .post(
        (req, res, next) => controllerService.checkAPIKey(req, res, next),
        (req, res, next) => shortenerController.encode(req, res));
URLRouter.route(`/decode`)
    .post(
        (req, res, next) => controllerService.checkAPIKey(req, res, next),
        (req, res, next) => shortenerController.decode(req, res));
URLRouter.route(`/statistic/:url`)
    .post(
        (req, res, next) => controllerService.checkAPIKey(req, res, next),
        (req, res, next) => shortenerController.decode(req, res));
export default URLRouter;
