import { responseHandler } from "../services/response.service.js";
import shortid from "shortid";
import validUrl from 'valid-url';
import { URLs } from "../models/URLs.js";
import { Statistics } from "../models/Statistics.js";
import { controllerService } from "../services/controller.service.js";

export const shortenerController = {
    list: (req, res) => {
        try {
            URLs.find({}, (error, urls) => {
                if(error) {
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        'Unable to fetch generated URLs'
                    );
                } else {
                    responseHandler.sendSuccess(
                        res,
                        200,
                        'URLs fetched successfully',
                        urls
                    );
                }
            });
        } catch (e) {
          responseHandler.sendError(
              res,
             400,
             'FAILURE',
             'Error while loading Url history',
              e
            );
        }
    },
    encode: (req, res) => {
      try {
        const { longUrl } = req.body;
        const userIP = req.socket.remoteAddress;
        if(!longUrl) {
            return responseHandler.sendError(
                res,
                400,
                'FAILURE',
                'Url to encode is required!'
            );
        }
        if (!validUrl.isUri(longUrl)) {
            responseHandler.sendError(
                res,
                400,
                'FAILURE',
                'Invalid url string provided'
            );
        } else {
            const generatedCode = shortid.generate();
            URLs.findOne({longUrl}, (error, urlData) => {
                if(urlData) {
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        'Url already encoded',
                        urlData
                    );
                } else {
                    const newUrl = {
                        longUrl,
                        urlCode: generatedCode,
                        creatorIP: userIP,
                        shortUrl: `${process.env.APP_BASE_URL}/${generatedCode}`
                    };
                    URLs.create(newUrl, (err, success) => {
                        if(err) {
                            responseHandler.sendError(
                                res,
                                400,
                                'FAILURE',
                                'Unable to encode URL',
                                err
                            );
                        } else {
                            responseHandler.sendSuccess(res, 200, 'Url shortened successfully', success)
                        }
                    });
                }
            })
        }
      } catch (e) {
        responseHandler.sendError(
          res,
          400,
          'FAILURE',
          'Error while processing URL',
            e
      );
      }
    },
    decode: (req, res) => {
        try {
          const { shortUrl } = req.body;
          if(!shortUrl) {
              return responseHandler.sendError(
                  res,
                  400,
                  'FAILURE',
                  'Provide URL to decode!'
              );
          }
          URLs.findOne({$or: [{ shortUrl }, { urlCode: shortUrl }]}, (error, url) => {
              if(error) {
                  responseHandler.sendError(
                      res,
                      400,
                      'FAILURE',
                      'Unable to decode URL'
                  );
              } else if(!url) {
                  responseHandler.sendError(
                      res,
                      404,
                      'FAILURE',
                      'Url not found on the server'
                  );
              } else {
                  responseHandler.sendSuccess(
                      res,
                      200,
                      'URL decoded successfully',
                      url
                  );
              }
          })
        } catch (e) {
            responseHandler.sendError(
                res,
                400,
                'FAILURE',
                'Error while processing URL',
                e
            );
        }
    },
    openMain: (req, res) => {
        const { code } = req.params;
        URLs.findOne({urlCode: code}, (err, url) => {
            if(err || !url) {
                responseHandler.sendError(
                    res,
                    400,
                    'FAILURE',
                    'URL does not exist on the server.'
                );
            } else {
                res.redirect(url.longUrl);
                controllerService.saveStatistic(req, code, url._id);
            }
        });
    },
    showStatistics: (req, res) => {
        try {
            const { url_path } = req.params;
            Statistics.find({ urlCode: url_path })
                .populate('urlId')
                .exec((error, urls) => {
                if(error || !urls.length) {
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        'Unable to fetch url statistics'
                    );
                } else {
                    responseHandler.sendSuccess(
                        res,
                        200,
                        'URL statistics fetched successfully',
                        { stats: urls, timesVisited: urls.length}
                    );
                }
            });
        } catch (e) {
            responseHandler.sendError(
                res,
                400,
                'FAILURE',
                'Error while loading Url statistics',
                e
            );
        }
    }
};