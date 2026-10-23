import { createServer } from 'node:http';
import { chromium, firefox, webkit } from 'playwright';

const received = {};
const server = createServer((req, res) => {
  received[req.url] = req.headers['user-agent'];
  res.writeHead(200);
  res.end();
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

for (const browserType of [chromium, firefox, webkit]) {
  const browser = await browserType.launch();
  const context = await browser.newContext({ userAgent: 'my-custom-user-agent' });
  const page = await context.newPage();

  let uaHeader;
  await page.route('**/fetched', async (route) => {
    uaHeader = route.request().headers()['user-agent'];
    await route.fulfill({ response: await route.fetch() });
  });
  await page.route('**/continued', (route) => route.continue());

  await page.goto(origin + '/');
  await page.evaluate(async () => {
    await fetch('/plain');
    await fetch('/continued');
    await fetch('/fetched');
  });

  console.log(`${browserType.name()} ${browser.version()}`);
  console.log(`plain request:    ${received['/plain']}`);
  console.log(`route.continue(): ${received['/continued']}`);
  console.log(`route.fetch():    ${received['/fetched']}`);
  console.log(`request.headers():${uaHeader}`);
  await browser.close();
}

server.close();
