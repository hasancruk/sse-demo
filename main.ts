const server = Deno.serve({ port: 8080 }, (req) => {
  if (new URL(req.url).pathname === "/event-reference") {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ message: "Connected!" })}\n\n`)
        );

        const interval = setInterval(() => {
          const data = {
            time: new Date().toISOString(),
            timestamp: Date.now(),
          };

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        }, 1000);

        req.signal.addEventListener("abort", () => {
          clearInterval(interval);
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  }

  if (new URL(req.url).pathname === "/") {
    const indexPage = Deno.readTextFileSync("./static/index.html");

    return new Response(indexPage, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return new Response("Not found", { status: 404 });
});

async function processExitHandler() {
  console.log("Server shutting down...");
  await server.shutdown();
}

Deno.addSignalListener("SIGTERM", processExitHandler);
Deno.addSignalListener("SIGINT", processExitHandler);
