import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { concat } from 'lodash';
import config from './helmetconfig.js';

const createHeader = (routes, state, params) => {
  let url = 'URL here.';
  let description = 'Description here.';

  const Meta = () => (
    <Helmet
      title={config.title}
      htmlAttributes={config.htmlAttributes}
      meta={config.meta}
      link={config.link}
      script={config.script}
    />
  )
  ReactDOMServer.renderToString(<Meta/>);
  return Helmet.rewind();
};

export default createHeader;
