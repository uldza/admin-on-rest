import * as messages from './messages';

export const DEFAULT_LOCALE = 'en';

export const resolveBrowserLocale = () => {
    // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
    // Rely on the window.navigator object to determine user locale
    const { language, browserLanguage, userLanguage } = window.navigator;
    return (language || browserLanguage || userLanguage).split('-')[0];
};

export const loadTranslations = locale => (
    messages[locale] ? messages[locale] : messages[DEFAULT_LOCALE]
);

export default loadTranslations;