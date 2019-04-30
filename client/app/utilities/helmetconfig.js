/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
import chromecon192 from 'images/favicons/android-chrome-192x192.png';
import chromecon384 from 'images/favicons/android-chrome-384x384.png';
import applecon from 'images/favicons/apple-touch-icon.png';
import mscon from 'images/favicons/ms-icon-150x150.png';
import favicon32 from 'images/favicons/favicon-32x32.png';
import favicon16 from 'images/favicons/favicon-16x16.png';
import favicon from 'images/favicons/favicon.ico';

const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { rel: 'icon', href: favicon },
    { rel: 'icon', sizes: '16x16', href: favicon16 },
    { rel: 'icon', sizes: '32x32', href: favicon32 },
    { rel: 'icon', sizes: '192x192', href: chromecon192 },
    { rel: 'icon', sizes: '384x384', href: chromecon384 },

    // Add to homescreen for Safari on IOS
    { rel: 'apple-touch-icon', sizes: '152x152', applecon }
  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: "Forget everything you know about driving." },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
    // Add to homescreen for Chrome on Android
    { name: 'mobile-web-app-capable', content: 'yes' },
    // Add to homescreen for Safari on IOS
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'Toyota RAV4' },
    // Tile icon for Win8 (144x144 + tile color)
    { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#3372DF' },
    { name: 'description', content: "Forget everything you know about driving." },
    { keywords: 'msapplication-TileColor', content: 'Toyota RAV4' }
  ],
  title: 'Toyota RAV4',
};

export default config;
