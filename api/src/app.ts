// Main Koa setup

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
