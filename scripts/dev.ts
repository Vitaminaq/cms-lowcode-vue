import { createServer as createViteServer, mergeConfig } from 'vite';
import express from 'express';
import vue from '@vitejs/plugin-vue';
import { baseConfig } from './util';
import Proxy from 'http-proxy';

const PROXY_PORT = 5173;

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { createApp } from 'vue'
      import App from '/src/container/container.vue'
      
      createApp(App).mount('#app')    
    </script>
  </body>
</html>
`;

function isStaticFilePath(path: string) {
    return path.match(/(\.\w+$)|@vite|@id|@react-refresh/);
}

async function createServer() {
    const app = express();

    const vite = await createViteServer(
        mergeConfig(baseConfig, {
            server: { middlewareMode: true, port: PROXY_PORT },
            appType: 'custom',
        })
    );

    // app.use(vite.middlewares);

    // app.get("/index.html", async (req, res, next) => {
    //   if (isStaticFilePath(req.path)) return next();

    //   const temp = await vite.transformIndexHtml(req.originalUrl, template);

    //   res.send(temp);
    // });

    // const proxy = new Proxy.createProxyServer({
    //   target: { host: 'localhost', port: PROXY_PORT }
    // });

    // app.get('*', (req, res) => proxy.web(req, res));

    // const server = await app.listen(5200, () => {
    //   console.log("http://localhost:5200");
    // });

    vite.listen();

    // server.on('upgrade', (req, socket, head) => {
    //   if (req.url == '/') proxy.ws(req, socket, head)
    // });

    // server.on("close", () => vite.close());
}

createServer();
