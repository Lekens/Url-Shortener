import { responseHandler } from "./response.service.js";
import { Statistics } from "../models/Statistics.js";
export const controllerService = {
    checkAPIKey: (req, res, next) => {
        try {
          if(req.headers && req.headers.authorization) {
            const apiKey = req.headers.authorization;
            if(!apiKey || apiKey !== process.env.APIKEY) {
                responseHandler.sendError(
                  res, 401, 'FAILURE', 'Authorization error: Invalid API-KEY',
                );
            } else {
                next();
            }
          } else {
           responseHandler.sendError(
            res,
           401,
           'FAILURE',
           'Authorization header not found in request',
           );
          }
        } catch (error) {
            responseHandler.sendError(
                res,
                500,
                'FAILURE',
                'Unable to check request header!',
            );
        }
    },
    saveStatistic: (req, code, urlId) => {
        Statistics.create({
            urlCode: code,
            urlId,
            visitorIP: req.socket.remoteAddress,
        }, (err) => {
            return true;
        });
    }
};