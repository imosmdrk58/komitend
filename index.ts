import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono()

app.get("*", serveStatic({ root: "./dist" }))
app.get("*", serveStatic({ path: "./dist/index.html" }))

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT!
})

console.log(`Server running on http://localhost:${process.env.PORT}`)