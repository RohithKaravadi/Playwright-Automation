import {expect, test} from '@playwright/test';

test('Get Users API Test', async ({request}) => {

        const requestHeaders=
        {
            'content-type': 'application/json',
            'Accept': 'application/json',
                            
        }
              const response = await request.post("https://jsonplaceholder.typicode.com/users",
                
                {   headers: requestHeaders,
                    data:
                    {
                        "name": "Test User",
                        "email": "testuser@example.com"
                    }
                }

    );

    const responseBody = await response.json();
    console.log(responseBody);
    console.log(response.headers());


    expect(response.status()).toBe(201);
    console.log("Response Status:"+ response.status());

    expect(response.headers()['content-type']).toBeDefined();

    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(response.headers()['server']).toBeDefined();

    expect(typeof responseBody.id).toBe('number');
    expect(responseBody.name).toBe('Test User');
    expect(responseBody.email).toBe('testuser@example.com');

})