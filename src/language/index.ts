import enLogin from "./en/login";
import esLogin from "./es/login";

// Define the structure for login messages
interface LoginMessages {
  title: string;
  emailLabel: string;
  passwordLabel: string;
  submitButton: string;
  errorMessage: string;
}

// Define the structure for messages in a specific language
interface LanguageMessages {
  login: LoginMessages;
}

// Define the overall messages structure
interface Messages {
  en: LanguageMessages;
  es: LanguageMessages;
}

export const messages: Messages = {
  en: {
    login: enLogin,
  },
  es: {
    login: esLogin,
  },
};
