import{page} from "@playwright/test";
import { checkOutPageLocators } from "../locators/CheckOutPageLocators.js";


export class CheckOutPage {
    constructor(page) {
        this.page = page;
    }
async getCheckOutElements(){

    return {
        page: await this.page.locator(checkOutPageLocators.pageInfo),
        cancelButton: await this.page.locator(checkOutPageLocators.cancelButton),
        continueButton: await this.page.locator(checkOutPageLocators.continueButton),
        firstName: await this.page.locator(checkOutPageLocators.firstName),
        lastName: await this.page.locator(checkOutPageLocators.lastName),
        postalCode: await this.page.locator(checkOutPageLocators.postalCode)
    }
}

    async filledCheckOutDetails(firstName, lastName, postalCode) {
        const checkOutData = await this.getCheckOutElements();
     
        await checkOutData.firstName.fill(firstName);
        await checkOutData.lastName.fill(lastName);
        await checkOutData.postalCode.fill(postalCode);

    }


    async clickCancel() {
        await this.page.locator(checkOutPageLocators.cancelButton).click();
    }

     async clickContinue() {
        await this.page.locator(checkOutPageLocators.continueButton).click();
    }


     async getErrorMessages() {
        await this.page.locator(checkOutPageLocators.errorMessage).click();
    }

    }
