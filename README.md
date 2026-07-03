# SSE Demo

This is a simple JS backend that supports streaming responses. The content type `text/event-stream` is a text format like `text/html` and this can be any text. In this example, the text data is a stringified JSON payload. On the client, a simple `fetch` request is performed, and the stream is incrementally read, parsed and processed into the document.

> [!NOTE]
> The [Web API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) `EventSource` was not used for the same reason that frameworks like [Datastar](https://data-star.dev/essays/another_dependency/) do not use it, which is the Web API does not support non-GET requests. This would have been a non-issue for this demo, but `fetch` is also a familiar API to the audience this demo is intended for.

## References

- https://www.pedroalonso.net/blog/sse-nextjs-real-time-notifications/
- https://github.com/vercel/next.js/discussions/67501
- https://docs.deno.com/runtime/fundamentals/http_server/#responding-with-a-stream
- https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
