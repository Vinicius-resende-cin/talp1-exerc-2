import { setWorldConstructor, World, Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, request, APIRequestContext } from '@playwright/test';
import mongoose from 'mongoose';

setDefaultTimeout(60 * 1000);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_management_system';

BeforeAll(async function () {
  await mongoose.connect(MONGODB_URI);
  await mongoose.connection.dropDatabase();
});

AfterAll(async function () {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  requestContext?: APIRequestContext;
}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext({ baseURL: 'http://localhost:3000' });
  this.page = await this.context.newPage();
  this.requestContext = await request.newContext({ baseURL: 'http://localhost:3001' });
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
  await this.requestContext?.dispose();
});
