import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env.local',
});

import fs from 'node:fs/promises';
import express, * as Express from 'express';
import type { ViteDevServer } from 'vite';
import expressProxy from 'express-http-proxy';

type ViteSSR = {
  templateHtmlPath: string;
  renderPath: string;
} & (
  | {
      isProduction: true;
      server: undefined;
      ssrManifest: string;
    }
  | {
      isProduction: false;
      server: ViteDevServer;
      ssrManifest: undefined;
    }
);

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ACCESS_KEY: string;
    }
  }
}

const base = '/';

// Add Vite or respective production middlewares
const applyEnvMiddleware = async (app: Express.Express): Promise<ViteSSR> => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;

    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));

    return {
      isProduction,
      server: undefined,
      ssrManifest: await fs.readFile(
        './dist/client/ssr-manifest.json',
        'utf-8'
      ),
      templateHtmlPath: './dist/client/index.html',
      renderPath: './dist/server/entry-server.js',
    };
  }

  const { createServer } = await import('vite');
  const server = await createServer({
    server: { middlewareMode: true, strictPort: true },
    appType: 'custom', // don't include Vite's default HTML handling middlewares
    base,
  });

  app.use(server.middlewares);

  return {
    isProduction,
    server,
    ssrManifest: undefined,
    templateHtmlPath: './index.html',
    renderPath: './src/entry-server.tsx',
  };
};

const readHtmlTemplate = async (url: string, vite: Readonly<ViteSSR>) => {
  const template = await fs.readFile(vite.templateHtmlPath, 'utf-8');
  if (vite.isProduction) {
    return template;
  }
  return await vite.server.transformIndexHtml(url, template);
};

type Render = (
  destination: Express.Response,
  onPipe: (destination: Express.Response) => void
) => Promise<void>;

const loadRender = async (vite: Readonly<ViteSSR>): Promise<Render> => {
  type EntryServer = Promise<{ render: Render }>;
  const module = vite.isProduction
    ? (import(vite.renderPath) as EntryServer)
    : (vite.server.ssrLoadModule(vite.renderPath) as EntryServer);
  return (await module).render;
};

const app = express();
const vite = await applyEnvMiddleware(app);

app
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
  .use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl.replace(base, '');

      const template = await readHtmlTemplate(url, vite);
      const render = await loadRender(vite);

      const [head, bodyEnd] = template.split(`<!--ssr-outlet-->`);

      res.status(200).set({ 'Content-Type': 'text/html' }).write(head);

      await render(res, (res) => {
        res.end(bodyEnd);
      });
    } catch (e) {
      if (e instanceof Response) {
        next(e);
      }
      vite.server?.ssrFixStacktrace(e as Error);
      console.error((e as Error).stack);
      res.status(500).end((e as Error).stack);
    }
  })
  .listen(5173, () => {
    console.log('listening port 5173');
  });
