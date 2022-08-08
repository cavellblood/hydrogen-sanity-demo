import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: () => ({
    defaultCountryCode: 'US',
    defaultLanguageCode: 'EN',
    storeDomain:
      // @ts-ignore
      Oxygen?.env?.SHOPIFY_STORE_DOMAIN || 'neuroh-hardwood.myshopify.com',
    storefrontToken:
      // @ts-ignore
      Oxygen?.env?.SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN ||
      '5e4d5defd9fdf9130909bef5ffe64fe5',
    storefrontApiVersion: '2022-07',
  }),
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
