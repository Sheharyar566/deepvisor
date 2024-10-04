import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { authRoutes, stripeRoutes } from './routes';

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.route('/', authRoutes);
app.route('/stripe', stripeRoutes);

const honoApp = handle(app);
export default honoApp;