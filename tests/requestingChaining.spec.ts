import { test, expect } from '@playwright/test';

test('Request Chaining Example', async ({ request }) => {

  const createBooking = await request.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            data: {
                firstname: 'Script',
                lastname: 'Execute',
                totalprice: 1200,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-01-10',
                    checkout: '2026-01-15'
                },
                additionalneeds: 'Breakfast'
            }
        }
    );

    expect(createBooking.status()).toBe(200);
    const createBookingBody = await createBooking.json();
    //console.log(createBookingBody);
    const bookingId = createBookingBody.bookingid;
    console.log("Booking ID:", bookingId);

    const getBooking = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    expect(getBooking.status()).toBe(200);
    console.log(await getBooking.json());

/////////////////////////////////////////

     const tokenResponse = await request.post(
        'https://restful-booker.herokuapp.com/auth',
        {
            data: {
                username: 'admin',
                password: 'password123'
            }
        }
    );

    expect(tokenResponse.status()).toBe(200);
    const tokenBody = await tokenResponse.json();
    const token = tokenBody.token;
    console.log("Token:", token);

    ////////////////////////////////////////////////////////////

       const updateBooking = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                      Cookie: `token=${token}`
                     },

            data: {
                firstname: 'Script ',
                lastname: ' and Execute',
                totalprice: 2000,
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-02-01',
                    checkout: '2026-02-05'
                },
                additionalneeds: 'Lunch'
            }
        }
    );

    expect(updateBooking.status()).toBe(200);
    console.log(await updateBooking.json());

    /////////////////////////////////////////////////////////////////////////////

     const deleteBooking = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );

    expect(deleteBooking.status()).toBe(201);
    console.log("Booking Deleted Successfully");

    ///////////////////////////////////////////////////////////////////

     const verifyBooking = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`
    );
    expect(verifyBooking.status()).toBe(404);
    console.log("Booking is no longer available.");
})