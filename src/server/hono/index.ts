import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { AuthRouter } from './routers'
import { zValidator } from '@hono/zod-validator'
import { hash } from '@node-rs/argon2';
import { z } from 'zod'
import { prisma } from '../prisma'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.post('/signup', zValidator('json', z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(5),
  password: z.string().min(8),
}).strict()), async (c) => {
  const { name, email, password } = c.req.valid('json');

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  if (existingUser) {
    return c.json({
      message: 'User already exists'
    }, 400);
  }

  const passwordHash = await hash(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    }
  });

  return c.json({
    message: 'User created',
  }, 201);
});

const honoApp = handle(app);
export default honoApp;