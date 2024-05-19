const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

import router from './routes'
import { Request,Response } from 'express';


app.get('/health', (req:Request, res:Response) => {
  res.send(200);
});
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
