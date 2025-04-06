Deno.serve((req) => {
    return new Response("Hello, World!", {
      headers: { "content-type": "text/plain" },
    });
  });