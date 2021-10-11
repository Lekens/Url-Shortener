import { controllerService } from "../controller.service";
import { mockNext, mockRequest, mockResponse } from "../../testUtils";

describe('Test controllerService', () => {
    it('checkAPIKey should return 401 if key not correct', async () => {
        const req = mockRequest({
         headers: { authorization: '9876545678'},
        });
        const resMock = {
            msg: 'Authorization error: Invalid API-KEY',
            code: '401'
        }
        const res = mockResponse(resMock);
        const next = mockNext();
        await controllerService.checkAPIKey(req, res, next);
        expect(res.status).toBeInstanceOf(Function);
        expect(res.code).toBe('401');
        expect(res.msg).toBe('Authorization error: Invalid API-KEY');

    })
    it('Return error when no header provided', async () => {
        const req = mockRequest({
         body: {  },
        });
        const resMock = {
            msg: 'Authorization header not found in request',
            code: '401'
        }
        const res = mockResponse(resMock);
        const next = mockNext();
        await controllerService.checkAPIKey(req, res, next);
        expect(res.status).toBeInstanceOf(Function);
        expect(res.code).toBe('401');
        expect(res.msg).toBe('Authorization header not found in request');

    })
    it('Return next once correct api is set', async () => {
        const req = mockRequest({
         headers: { authorization: '90976cc4f16bfbb6dd0d417c4ef7530' },
        });
        const resMock = {};
        const res = mockResponse(resMock);
        const next = mockNext();
        const a = await controllerService.checkAPIKey(req, res, next);
        expect(a).toHaveProperty('send');
        // expect(controllerService.checkAPIKey(req)).toThrowError();
    })
});
describe('Save statistics', () => {
    it('Call saveStatistic service', async () => {
        const req = mockRequest({
            headers: { authorization: '90976cc4f16bfbb6dd0d417c4ef7530' },
            socket: {
                remoteAddress: '90:0:0:1'
            }
        });
        expect(await controllerService.saveStatistic(req,'87979', '123456')).toBeUndefined();
    })
});