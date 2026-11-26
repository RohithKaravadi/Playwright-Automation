import { test, expect } from '@playwright/test';

test.only('Basic Authentication API', async({request})=>{
    const response = await request.get(
        'https://httpbin.org/basic-auth/user/passwd',
        {  
             headers:{
                Authorization:
                'Basic ' +
                  Buffer.from('user:passwd').toString('base64') //Authorization: Basic <Base64-encoded credentials>
             }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.authenticated).toBe(true);
    expect(responseBody.authorized).toBe(true);
    expect(responseBody.user).toBe('user');
})