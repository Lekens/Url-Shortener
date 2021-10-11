import request  from "supertest";
import express from "express";
import URLRouter from "../URLRouter.js";
const app = express();
app.use('/api/', URLRouter);

describe('Test URL Router js routes', () => {
    it('Should access the /list route',  () => {
        const res = request(app).get('/list');
        expect(res.redirects().url).toContain('/list');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', /json/);
    });
    it('Should access the /encode route',  () => {
        const res = request(app).post('/encode')
            .send({longUrl: 'https://facebook.com'})
            .set('Accept', 'application/json');
        expect(res.redirects().url).toContain('/encode');
        expect(res.redirects()).toHaveProperty('method', 'POST');
        res.expect('Content-Type', /json/);
    });
    it('Should access the /decode route',  () => {
        const res = request(app).post('/decode')
            .send({longUrl: 'http://localhost:8090/abc'})
            .set('Accept', 'application/json');
        expect(res.redirects().url).toContain('/decode');
        expect(res.redirects()).toHaveProperty('method', 'POST');
        res.expect('Content-Type', /json/);
    });
    it('Should access the /statistic/abc route',  () => {
        const res = request(app).get('/statistic/abc')
        expect(res.redirects().url).toContain('/statistic/abc');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', /json/);
    });
})