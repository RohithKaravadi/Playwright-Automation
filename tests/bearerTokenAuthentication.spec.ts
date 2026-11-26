import { test, expect } from '@playwright/test';

test.only('Beaer Token Authentication API', async({request})=>{
    const response = await request.post(
        'https://dummyjson.com/auth/login',
         { 
            data:{
                username: 'emilys',
                password: 'emilyspass'
            }

          }
       )
       expect(response.status()).toBe(200);
       const responseBody = await response.json();
       console.log(responseBody);
       const accessToken = responseBody.accessToken;
       console.log("Access Token: "+accessToken);



       const profileResponse = await request.get(
        'https://dummyjson.com/auth/me', {

            headers:
            {                
               Authorization:`Bearer ${accessToken}`         
            }
        }
       )
       expect(profileResponse.status()).toBe(200);
       const profileBody = await profileResponse.json();
       console.log(profileBody);
       expect(profileBody.username).toBe("emilys");
       expect(profileBody.email).toBe("emily.johnson@x.dummyjson.com");
       expect(profileBody.firstName).toBe("Emily");

    });

