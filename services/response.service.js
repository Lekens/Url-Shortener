import { successResponse } from '../interfaces/response.js';
import { errorResponse } from "../interfaces/error.js";

export const responseHandler = {
    sendError: (res, code, status, message, error) => {
        const err = new Error(message);
        errorResponse.status = status;
        errorResponse.code = code;
        errorResponse.msg = message;
        error ? err.ERROR = error : null;
        return res.status(code).send(errorResponse);
        },
    sendSuccess: (res, code, message, data, encode= true) => {
        successResponse.data = data;
        successResponse.msg = message;
        if(code){
            successResponse.code = code;
        }
        return res.json(successResponse);
    }
};