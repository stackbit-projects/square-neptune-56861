// import libs
const dotenv = require("dotenv");
const { uniformNextConfig } = require("@uniformdev/next-server");

module.exports = function () {
  // load default configuration from uniform.config
  process.env.PORT = 3000;
  process.env.UNIFORM_API_TOKEN = "12345";

  // complete configuration using dotenv
  const env = dotenv.config();

  if (!env.parsed) {
    console.log("dotenv didn't parse");
  } else {
    const keys = Object.keys(env.parsed);
    keys.forEach((k) => {
      const value = env.parsed[k];
      console.log("Overriding " + k + " env variable to " + value);
      process.env[k] = env.parsed[k];
    });
  }

  // these values must not be changed via .env
  process.env.UNIFORM_OPTIONS_MVC_SUPPORT = "true";
  process.env.UNIFORM_OPTIONS_MVC_SPA_ENABLED = "false";
  //process.env.UNIFORM_OPTIONS_MVC_MODE = "mixed";
  process.env.UNIFORM_PUBLISH_TARGET = "none";

  return uniformNextConfig({
    env: {
      NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
      NEXT_PUBLIC_PAYPAL_KEY: process.env.NEXT_PUBLIC_PAYPAL_KEY,
      NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL || "https://gd-dev.azureedge.net/",
      NEXT_PUBLIC_CHATBOT_DELAY: process.env.NEXT_PUBLIC_CHATBOT_DELAY || "2000",
      NEXT_PUBLIC_GOOGLEPAY_MERCHANTID: process.env.NEXT_PUBLIC_GOOGLEPAY_MERCHANTID,
      NEXT_PUBLIC_GOOGLEPAY_ENVIRONMENT: process.env.NEXT_PUBLIC_GOOGLEPAY_ENVIRONMENT,
    }
  });
};
