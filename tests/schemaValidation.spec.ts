import Ajv from 'ajv';
import { test, expect } from '@playwright/test';

test('JSON Schema Validation', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    // Validate status code
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Define JSON Schema
    const username = {
        type: 'object',

        required: [
            'id',
            'name',
            'username',
            'email',
            'address',
            'phone',
            'website',
            'company'
        ],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },

            address: {
                type: 'object',

                required: [
                    'street',
                    'suite',
                    'city',
                    'zipcode',
                    'geo'
                ],

                properties: {
                    street: { type: 'string' },
                    suite: { type: 'string' },
                    city: { type: 'string' },
                    zipcode: { type: 'string' },

                    geo: {
                        type: 'object',

                        required: ['lat', 'lng'],

                        properties: {
                            lat: { type: 'string' },
                            lng: { type: 'string' }
                        }
                    }
                }
            },

            phone: { type: 'string' },
            website: { type: 'string' },

            company: {
                type: 'object',

                required: [
                    'name',
                    'catchPhrase',
                    'bs'
                ],

                properties: {
                    name: { type: 'string' },
                    catchPhrase: { type: 'string' },
                    bs: { type: 'string' }
                }
            }
        }
    };

    // Initialize AJV
    const ajv = new Ajv();

    // Compile JSON Schema
    const validate = ajv.compile(username);

    // Validate API response
    const isValid = validate(responseBody);

    // Assert schema validation
    expect(isValid).toBe(true);

});
