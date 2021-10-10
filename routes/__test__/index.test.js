import request  from "supertest";
import express from "express";
import router from "../index.js";
const app = express();
app.use('/', router);

describe('Test Index js routes', () => {
    it('should create a new post',  () => {
        const cb = jest.fn();
        const res = request(app).get('/oiuyt', cb());
        expect(res.redirects().url).toContain('/oiuyt');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', 'text/html')
            .expect('Content-Length', '15')
            .expect(200);
    });
})