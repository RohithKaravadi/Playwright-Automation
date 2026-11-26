import { test, expect } from '@playwright/test';

test('Generate OAuth Access Token', async ({ request }) => {

    const tokenResponse  = await request.post(
        'https://github.com/login/oauth/access_token',
        {
            headers: {
                Accept: 'application/json'
            },
            form: {
                client_id: 'Ov23liPGJL1k5fSpg6o3',
                client_secret: '57b6b906c4f4dd3bdcb817028cda53ed59b4ddcc',
                code: 'f0a8c4004294b10bc509',
                }
        }
    );

     expect(tokenResponse .status()).toBe(200);
     const tokenBody  = await tokenResponse .json();
     console.log('Token API Status:', tokenResponse.status());
     console.log('Token Type:', tokenBody.token_type);
     console.log(tokenBody);
     
    //  Access token generation and storing in to the variable to authorize
     const accessToken = tokenBody.access_token;
     console.log("Access Token:", accessToken);
       const response = await request.get(
        'https://api.github.com/user',
        {
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github+json',
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
})