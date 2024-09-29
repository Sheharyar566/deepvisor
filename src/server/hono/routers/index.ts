import { prisma } from "@/server/prisma";
import { zValidator } from "@hono/zod-validator";
import { hash } from "@node-rs/argon2";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();



export { app as AuthRouter };