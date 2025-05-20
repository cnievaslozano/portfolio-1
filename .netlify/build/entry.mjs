import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BE1c7wXo.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/neovim/about.astro.mjs');
const _page2 = () => import('./pages/neovim/contact.astro.mjs');
const _page3 = () => import('./pages/neovim/help.astro.mjs');
const _page4 = () => import('./pages/neovim/projects.astro.mjs');
const _page5 = () => import('./pages/neovim.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.15.11_@types+node@2_3de30862c1415149f68bb19865f7ee8f/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/neovim/about.astro", _page1],
    ["src/pages/neovim/contact.astro", _page2],
    ["src/pages/neovim/help.astro", _page3],
    ["src/pages/neovim/projects.astro", _page4],
    ["src/pages/neovim/index.astro", _page5],
    ["src/pages/index.astro", _page6]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4ca7fdf3-598d-4720-bfa2-055a45cba913"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
