import  { test } from '@playwright/test';

test("Network Interception User Test", async ({page}) => 
{   
    await page.route("**/products.json", async (route) =>
    {
         const request = route.request();
        // console.log('URL:', request.url);
        // console.log('Method:', request.method());
        // console.log('Headers:', request.headers());
        // console.log("Network Intercepted");
        // console.log("Network API Interception Blocked");
        // await route.abort();  

        const response = await route.fetch();
        const body = await response.json();

        // fetching only first 3 products
        body.products = body.products.slice(0 , 3);

        await route.fulfill({
            response, 
            body: JSON.stringify(body)
        });
    });
    await page.goto("https://react-shopping-cart-67954.firebaseapp.com/");
    await page.waitForTimeout(5000);

})