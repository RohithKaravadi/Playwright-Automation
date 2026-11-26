import { test, expect } from '@playwright/test';
test("Patch API User Test", async ({request}) => 
{
    const response = await request.patch("https://jsonplaceholder.typicode.com/users/1",
     
    {   
     data:
         {
          
          "email": "updated.doe@example.com"
         }

     })

     // step:1 validating the response status code
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(200);
        console.log("Response Status:"+ response.status());
        expect(typeof responseBody).toBe('object');
        expect(responseBody.email).toBe("updated.doe@example.com");   
        expect(responseBody.id).toBe(1);    
        expect(responseBody.name).toBeDefined();
        expect(responseBody.email).toBeDefined();
        expect(typeof responseBody.email).toBe('string');

       
});
