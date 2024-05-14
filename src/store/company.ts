import CONSTANTS from "../constants/envConstants";

const productsURL = `${CONSTANTS.IS_DEV ? `/proxy` : `${import.meta.env.VITE_APP_HOST_URL /*->TODO: API통신 URL*/}`}/products`;
console.log(productsURL);
