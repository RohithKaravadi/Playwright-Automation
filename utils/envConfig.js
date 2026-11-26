 export const BASEURL = "https://www.saucedemo.com/";

const ENV_URL ={

    Dev_URL: "https://www.saucedemo.com/",
    QA_URL: "https://www.saucedemo.com/",
    Stage_URL: "https://www.saucedemo.com/",
    Prod_URL: "https://www.saucedemo.com/"
}
const ENV = process.env.NODE_ENV || "Prod_URL";
export const BASE_URL = (ENV_URL)[ENV];

export const USERNAME = "standard_user";
export const PASSWORD = "secret_sauce";
