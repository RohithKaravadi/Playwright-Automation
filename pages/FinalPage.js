import{page} from '@playwright/test';
import{finalPageLocators} from '../locators/FinalPageLocators.js';

export class FinalPage{
    constructor(page){
        this.page = page;
    }


    async getFinalPageElements(){
        return {
            pageInfo: await this.page.locator(finalPageLocators.pageInfo),
            successMessage: await this.page.locator(finalPageLocators.successMessage),
            backHomeButton: await this.page.locator(finalPageLocators.backHomeButton)
        };
    }

    async getSuccessMessageText(){

       const text = this.page.locator(finalPageLocators.successMessage)
       return text;
    }

    async clickBackHomeButton(){
        await this.page.locator(finalPageLocators.backHomeButton).click(); 
    }
}