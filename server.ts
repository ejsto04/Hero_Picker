import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { join, extname } from "https://deno.land/std@0.224.0/path/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
// serves.ts

// 


console.log("Server running at http://localhost:8000");

const config = JSON.parse(await Deno.readTextFile("config.json"));

const client = new Client({
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    hostname: config.db.hostname,
    port: config.db.port,
});
await client.connect();

console.log("Server running at http://localhost:8000");

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
      
  if (pathname === "/api/heros_db" && req.method === "GET") {
    try {
      const result = await client.queryObject("SELECT * FROM heros_db");
      //console.log(result.rows);
      return new Response(JSON.stringify(result.rows), {
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.error("❌ DB Error:", err);
      return new Response("Database error", { status: 500 });
    }
  }
  if (pathname === "/api/teamups" && req.method === "GET") {
    try {
      const result = await client.queryObject("SELECT * FROM teamups");
      //console.log(result.rows);
      return new Response(JSON.stringify(result.rows), {
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.error("❌ DB Error:", err);
      return new Response("Database error", { status: 500 });
    }
  }

  if (pathname === "/") {
    try {
      const html = await Deno.readFile("hero.html");
      return new Response(html, {
        headers: { "content-type": "text/html" },
      });
    } catch {
      return new Response("hero.html not found", { status: 404 });
    }
  }

  // Serve image files from Hero_pics folder
  
    const filePath = join(".", pathname);
    try {
      const file = await Deno.readFile(filePath);
      const contentType = getContentType(filePath);
      return new Response(file, {
        headers: { "content-type": contentType },
      });
    } catch {
      return new Response("Image not found", { status: 404 });
    }

  //return new Response("Not Found", { status: 404 });
});

function getContentType(path: string): string {
  const ext = extname(path).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}
