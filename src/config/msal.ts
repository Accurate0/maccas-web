import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const MSALConfig: Configuration = {
  auth: {
    clientId: "f285a3b9-c589-4fae-971e-edd635df6b96",
    authority: "https://apib2clogin.b2clogin.com/apib2clogin.onmicrosoft.com/B2C_1_SignIn",
    knownAuthorities: ["https://apib2clogin.b2clogin.com/"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const LoginRequest = {
  redirectUri: "/login",
  scopes: ["openid"],
};

export const TokenRequest = {
  scopes: ["openid"],
};

export const MSALInstance = new PublicClientApplication(MSALConfig);

MSALInstance.handleRedirectPromise()
  .then(() => {})
  .catch(() => {});
