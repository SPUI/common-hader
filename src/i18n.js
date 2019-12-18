import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import {
  isTestEnv,
  isStableEnv,
} from './utils';

const loadPath =
  isTestEnv() ? `https://api.locize.io/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/latest/{{lng}}/{{ns}}` :
  isStableEnv() ? `https://i18n.res.ethfans.org/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/latest/{{lng}}/{{ns}}` :
  `https://i18n.res.ethfans.org/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/prod/{{lng}}/{{ns}}?version=${process.version}`;

i18next
  .use(Backend)
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'zh-Hant': [ 'zh' ],
      'zh-TW': [ 'zh' ],
      'zh-CN': [ 'zh' ],
      'zh-Hans-CN': [ 'zh' ],
      'zh-SG': [ 'zh' ],
      'zh-HK': [ 'zh' ],
      'zh-Hans': [ 'zh' ],
      'en-US': [ 'en' ],
      default: [ 'zh' ],
    },
    debug: false,
    preload: ['zh', 'en'],
    ns: ['footer'],
    defaultNS: 'footer',
    // interpolation: {
    //   escapeValue: false,
    // },
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
    },
    backend: {
      loadPath,
      allowMultiLoading: false,
      crossDomain: true,
      withCredentials: false,
    },
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'subdomain'],

      // keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: 'sparkpool.com',

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement
    }
});

export default i18next;
