import * as express from 'express';

const app = express()

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`))