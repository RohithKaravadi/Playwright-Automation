import{test, expect} from '@playwright/test'
import { request } from 'node:http'

test('Validate the API pass key', async({request})=>{
    const response = await request.get('https://beta-api.thecatapi.com/v1/images/search',
        {
            headers:{

                    'x-api-key': 'live_Bpw5HXxLAJqpV94NLbBqxaoXReCfKyX9A4AC3nKjaKURPD9hdrcTcNmgYV14kFXA'
                }
        }
    )
    expect(response.status()).toBe(200);
    const reponseBody = await response.json();
    console.log(reponseBody);
    expect(Array.isArray(reponseBody)).toBeTruthy();
    expect(reponseBody.length).toBeGreaterThan(0);
    expect(reponseBody[0]).toHaveProperty('id');
    expect(reponseBody[0]).toHaveProperty('url');

})


