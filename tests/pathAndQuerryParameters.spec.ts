import { test, expect } from '@playwright/test';


test.describe('Path Parameter and Query Parameter', () => {

      test('Path Parameter Example', async ({ request }) => {
        const response = await request.get('https://dummyjson.com/products/category/smartphones');
        //GET https://dummyjson.com/products/category/smartphones

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        // expect(responseBody).toHaveProperty('firstname');
        // expect(responseBody).toHaveProperty('lastname');

    });
    test('Query Parameter using URL', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/products?skip=5');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});
  test('Query Parameter using params option', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products',
        {
            params: {
                limit: 5
            }
        }
    );

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    console.log('Products Returned:', responseBody.products.length);
    expect(responseBody.products.length).toBe(5);
});
test('Multiple Query Parameters using URL', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products?limit=5&skip=5'
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.products.length).toBe(5);
});
test('Multiple Query Parameters using params', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products',
        {
            params: {
                limit: 5,
                skip: 5
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.products.length).toBe(5);
});
})