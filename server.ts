import fs from 'node:fs/promises';
import type * as Express from 'express';
import express from 'express';
import type { ViteDevServer } from 'vite';

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

const base = '/';

const createViteApp = async (
  serverCreator: () => Express.Express
): Promise<{
  app: Express.Express;
  vite: ViteSSR;
}> => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const { default: compression } = await import('compression');
    const { default: sirv } = await import('sirv');

    return {
      app: serverCreator()
        .use(compression())
        .use(base, sirv('./dist/client', { extensions: [] })),
      vite: {
        isProduction,
        server: undefined,
        ssrManifest: await fs.readFile(
          './dist/client/ssr-manifest.json',
          'utf-8'
        ),
        templateHtmlPath: './dist/client/index.html',
        renderPath: './dist/server/entry-server.js',
      },
    };
  }

  const { createServer } = await import('vite');
  const server = await createServer({
    server: {
      middlewareMode: true,
      strictPort: true,
    },
    appType: 'custom', // do not include Vite's default HTML handling middlewares
    base,
  });

  return {
    app: serverCreator().use(server.middlewares),
    vite: {
      isProduction,
      server,
      ssrManifest: undefined,
      templateHtmlPath: './index.html',
      renderPath: './src/entry-server.tsx',
    },
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
  onAllReady: () => void
) => Promise<void>;

const loadRender = async (vite: Readonly<ViteSSR>): Promise<Render> => {
  type EntryServer = Promise<{ render: Render }>;
  const module = vite.isProduction
    ? (import(vite.renderPath) as EntryServer)
    : (vite.server.ssrLoadModule(vite.renderPath) as EntryServer);
  return (await module).render;
};

const { app, vite } = await createViteApp(express);

app
  .use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl.replace(base, '');

      const template = await readHtmlTemplate(url, vite);
      const render = await loadRender(vite);

      const [head, bodyEnd] = template.split(`<!--ssr-outlet-->`);

      res.status(200).set({ 'Content-Type': 'text/html' }).write(head);

      await render(res, () => {
        res.end(bodyEnd);
      });
    } catch (e) {
      if (e instanceof Response) {
        console.log(e);
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
