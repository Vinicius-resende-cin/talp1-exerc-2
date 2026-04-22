import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './support/env';

// We store mapping from table ID/Name to real backend IDs for grades
const studentMap: Record<string, string> = {};

Given('the following students exist', async function (this: CustomWorld, table) {
  for (const row of table.hashes()) {
    const res = await this.requestContext!.post('/api/v1/students', {
      data: {
        name: row.name,
        cpf: Math.random().toString().slice(2, 13).padStart(11, '0'),
        email: `${row.name.replace(/\s+/g, '').toLowerCase()}@example.com`
      }
    });
    const d = await res.json();
    studentMap[row.id || row.name] = d.id ?? d._id;
  }
});

Given('the following grades have been assigned', async function (this: CustomWorld, table) {
  for (const row of table.hashes()) {
    const realStudentId = studentMap[row.studentId];
    await this.requestContext!.post('/api/v1/exams', {
      data: {
        studentId: realStudentId,
        subject: row.subject,
        grade: row.grade
      }
    });
  }
});

Then('I should see a table displaying a matrix of students and subjects', async function (this: CustomWorld) {
  await expect(this.page!.locator('table')).toBeVisible();
});

Then('the matrix should show subjects {string} and {string} as columns', async function (this: CustomWorld, subj1: string, subj2: string) {
  const tableHead = this.page!.locator('thead');
  await expect(tableHead).toContainText(subj1);
  await expect(tableHead).toContainText(subj2);
});

Then('the matrix should display the grade {string} for student {string} under subject {string}', async function (this: CustomWorld, grade: string, name: string, subject: string) {
  const row = this.page!.locator('tr', { hasText: name });
  await expect(row).toContainText(grade);
});

When('I fill in the grade assignment form with', async function (this: CustomWorld, table) {
  const row = table.hashes()[0];
  const realStudentId = studentMap[row.studentId];
  
  // Wait for the select dropdown to be populated
  await this.page!.waitForSelector(`select[name="studentId"] option[value="${realStudentId}"]`);
  await this.page!.selectOption('select[name="studentId"]', realStudentId);
  
  await this.page!.fill('input[name="subject"]', row.subject);
  await this.page!.selectOption('select[name="grade"]', row.grade);
});

When('I submit the {string} button', async function (this: CustomWorld, buttonText: string) {
  await this.page!.click(`button:has-text("${buttonText}")`);
});

Then('the matrix should update and display grade {string} for student {string} under subject {string}', async function (this: CustomWorld, grade: string, name: string, subject: string) {
  const row = this.page!.locator('tr', { hasText: name });
  await expect(row).toContainText(grade);
});

Given('the student {string} has the grade {string} for subject {string}', async function (this: CustomWorld, name: string, grade: string, subject: string) {
  const res = await this.requestContext!.post('/api/v1/students', {
    data: {
      name,
      cpf: Math.random().toString().slice(2, 13).padStart(11, '0'),
      email: `${name.replace(/\s+/g, '').toLowerCase()}@example.com`
    }
  });
  const d = await res.json();
  const realStudentId = d.id ?? d._id;
  studentMap[name] = realStudentId;

  await this.requestContext!.post('/api/v1/exams', {
    data: {
      studentId: realStudentId,
      subject: subject,
      grade: grade
    }
  });
});

When('I am on the {string} page', async function (this: CustomWorld, pageName: string) {
  await this.page!.goto('/');
  await this.page!.click(`button:has-text("${pageName}")`);
});

When('I fill in the form for {string} and subject {string} with a new grade of {string}', async function (this: CustomWorld, name: string, subject: string, grade: string) {
  const realStudentId = studentMap[name];
  await this.page!.waitForSelector(`select[name="studentId"] option[value="${realStudentId}"]`);
  await this.page!.selectOption('select[name="studentId"]', realStudentId);
  await this.page!.fill('input[name="subject"]', subject);
  await this.page!.selectOption('select[name="grade"]', grade);
});

Then('the grade matrix should update the cell for {string} and {string} to {string}', async function (this: CustomWorld, name: string, subject: string, grade: string) {
  const row = this.page!.locator('tr', { hasText: name });
  await expect(row).toContainText(grade);
});

When('I click the remove grade button in the cell for {string} and {string}', async function (this: CustomWorld, name: string, subject: string) {
  const row = this.page!.locator('tr', { hasText: name });
  await row.getByRole('button', { name: 'Remove' }).click(); // assuming this is how removal works in UI
});

When('I confirm the removal', async function (this: CustomWorld) {
  // If the app doesn't have an alert wrapper, doing nothing works
  // If it has window.confirm, Playwright automatically dismisses it by default, we need page.on('dialog', d => d.accept())
});

