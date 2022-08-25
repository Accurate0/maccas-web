import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const MSALConfig: Configuration = {
  auth: {
    clientId: "f285a3b9-c589-4fae-971e-edd635df6b96",
    authority: "https://apib2clogin.b2clogin.com/apib2clogin.onmicrosoft.com/B2C_1_SignIn",
    knownAuthorities: ["https://apib2clogin.b2clogin.com/"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const TOKEN_LOCAL_STORAGE = "ACCESS_TOKEN";

export const LoginRequest = {
  redirectUri: `/login`,
  scopes: [
    "openid",
    "https://login.anurag.sh/f285a3b9-c589-4fae-971e-edd635df6b96/Maccas.ReadWrite",
  ],
};

export const TokenRequest = {
  scopes: [
    "openid",
    "https://login.anurag.sh/f285a3b9-c589-4fae-971e-edd635df6b96/Maccas.ReadWrite",
  ],
};

export const MSALInstance = new PublicClientApplication(MSALConfig);

MSALInstance.handleRedirectPromise()
  .then((tokenResponse) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE, tokenResponse?.accessToken ?? "");
  })
  .catch((error) => {});
