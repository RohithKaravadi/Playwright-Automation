import {expect, test} from '@playwright/test';

//  get request to fetch the users or data
test('Get Users API Test', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);


    // step:2 covert the response body to JSON and validate the data
    const data = await response.json();
    console.log(data);

    // step:3 validate the data array length
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBe(10);

    // step:4 validate the first user object properties
    const firstUser = data[0];
    expect(firstUser.id).toBe(1);
    expect(firstUser.name).toBeDefined();
    expect(firstUser.username).toBeDefined();
    expect(firstUser.email).toBeDefined();

    // step:5 validate the nested object properties
    expect(firstUser.address).toBeDefined();
    expect(firstUser.address.street).toBeDefined();
    expect(firstUser.address.city).toBeDefined();
    expect(firstUser.address.zipcode).toBeDefined();


    // step:6 validate the company object properties

    expect(firstUser.company).toBeDefined();
    expect(firstUser.company.name).toBeDefined();
    expect(firstUser.company.catchPhrase).toBeDefined();
    expect(firstUser.company.bs).toBeDefined();


    for(const user of data) {
        expect(user.id).toBeDefined();
        expect(user.name).toBeDefined();
        expect(user.username).toBeDefined();
        expect(user.email).toContain('@');
    }

    //empty validation
    expect(data).not.toBe('');
});

