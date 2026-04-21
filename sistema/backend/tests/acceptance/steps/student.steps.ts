import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import request, { Response } from 'supertest';
import { app } from '../../../src/app';

let latestResponse: Response;

When('I request the health endpoint', async function () {
  latestResponse = await request(app).get('/health');
});

Then('the response status should be {int}', function (statusCode: number) {
  assert.strictEqual(latestResponse.status, statusCode);
});

Then('the health status should be {string}', function (statusText: string) {
  assert.strictEqual(latestResponse.body.status, statusText);
});
