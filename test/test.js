import { after, before, describe, it } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import url from 'node:url';

import { ComputeApplication } from '@fastly/compute-testing';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

describe('Edge app', () => {

  const app = new ComputeApplication();

  before(async () => {

    // Start the app
    await app.start({
      // Set 'appRoot' to the directory in which to start the app.  This is usually
      // the directory that contains the 'fastly.toml' file.
      appRoot: path.join(__dirname, '..'),
    });

  });

  after(async() => {
    // Shut down the app
    await app.shutdown();
  });

  it('returns 200 and text "HTTP me!" for /', async () => {
    const resp = await app.fetch('/');
    assert.strictEqual(resp.status, 200);
    assert.ok((await resp.text()).includes('HTTP me!'));
  });

  it('returns 200 and json including "newField": "newValue" for /json', async () => {
    const resp = await app.fetch('/json');
    assert.strictEqual(resp.status, 200);

    const responseJson = await resp.json();
    assert.strictEqual(responseJson['data']?.['newField'], 'newValue');
  });
});
