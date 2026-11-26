import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

test.only('Get Products', async ({ request }) => {
     console.log(process.env.BASE_URL);
    const response = await request.get(`${process.env.BASE_URL}/products/1`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});