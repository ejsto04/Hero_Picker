// serves.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { join, extname } from "https://deno.land/std@0.224.0/path/mod.ts";

console.log("Server running at http://localhost:8000");

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  //console.log(pathname)
  // console.log("➡ Request:", pathname);
  // Serve the hero.html file at root
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
