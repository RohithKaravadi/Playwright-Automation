import { test, expect } from '@playwright/test';


test("Delete User API Test", async ({request}) => 
{
    const response = await request.delete("https://jsonplaceholder.typicode.com/users/1")

    console.log("Response Status:"+ response.status());
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual({});

})