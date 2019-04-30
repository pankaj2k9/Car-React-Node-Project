import { get } from 'lodash';

export function formatUrl(str) {
  var mapObj = {
    'adventurerx': '',
    '/': '',
    '-': ' '
  };
  str = str.replace(/\/|-|adventurerx/gi, function (matched) {
    return mapObj[matched];
  });
  str = str.replace(/\w\S*/g, function (text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
  return str;
}
