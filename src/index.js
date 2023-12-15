/// <reference types="@fastly/js-compute" />
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;
  const url = new URL(req.url);

  const response = await fetch(req, {
    'headers': { 'host': 'http-me.glitch.me' },
    'backend': 'backend'
  });

  if (url.pathname === "/json") {
    const responseJson = await response.json();
    responseJson['data']['newField'] = 'newValue';
    return new Response(JSON.stringify(responseJson), {
      status: responseJson.status,
      headers: responseJson.headers,
    });
  }

  return response;
}
