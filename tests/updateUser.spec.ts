import { test, expect } from '@playwright/test';
test("Update User API Test", async ({request}) => 
{
    const response = await request.put("https://jsonplaceholder.typicode.com/users/1",
     
    {   
     data:
         {
          "name": 'Updated Name',
          "email": "updated.doe@example.com"
         }

     })

     // step:1 validating the response status code
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(200);
        console.log("Response Status:"+ response.status());

     // step:2 validating the response body
        expect(responseBody.name).toBe("Updated Name");
        expect(responseBody.email).toBe("updated.doe@example.com");

     // step:3 validating the Data of the updated user id, email and name
        expect(responseBody.id).toBe(1);    
        expect(responseBody.name).toBeDefined();
        expect(responseBody.email).toBeDefined();

        expect(responseBody.name).toBe("Updated Name");
        expect(responseBody.email).toContain("@");
});
