import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env.local',
});

import express from 'express';
import expressProxy from 'express-http-proxy';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ACCESS_KEY: string;
    }
  }
}

express()
  .use(
    '/unsplash',
    expressProxy('https://api.unsplash.com', {
      proxyReqOptDecorator: (requestOptions) => ({
        ...requestOptions,
        headers: {
          ['Accept-Version']: 1,
          ['Authorization']: `Client-ID ${process.env.ACCESS_KEY}`,
        },
      }),
    })
  )
  .listen(80, () => {
    console.log('listening port 80');
  });
