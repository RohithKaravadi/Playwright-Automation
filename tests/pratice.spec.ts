// import {test, expect} from '../fixture/auth.fixture';
import {test, expect, devices} from 'playwright/test'

// test.use({...devices['iPad Mini']})

console.log(Object.keys(devices))

test("Mobile Device emulation", async ({page})=>{

    await page.goto('https://www.saucedemo.com');
    
    await page.waitForTimeout(5000);
})