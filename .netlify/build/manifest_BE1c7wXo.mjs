import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_upARfz6O.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/liwk/Documents/portfolio/portfolio/","adapterName":"@astrojs/netlify","routes":[{"file":"neovim/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/neovim/about","isIndex":false,"type":"page","pattern":"^\\/neovim\\/about\\/?$","segments":[[{"content":"neovim","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neovim/about.astro","pathname":"/neovim/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"neovim/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/neovim/contact","isIndex":false,"type":"page","pattern":"^\\/neovim\\/contact\\/?$","segments":[[{"content":"neovim","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neovim/contact.astro","pathname":"/neovim/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"neovim/help/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/neovim/help","isIndex":false,"type":"page","pattern":"^\\/neovim\\/help\\/?$","segments":[[{"content":"neovim","dynamic":false,"spread":false}],[{"content":"help","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neovim/help.astro","pathname":"/neovim/help","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"neovim/projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/neovim/projects","isIndex":false,"type":"page","pattern":"^\\/neovim\\/projects\\/?$","segments":[[{"content":"neovim","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neovim/projects.astro","pathname":"/neovim/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"neovim/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/neovim","isIndex":true,"type":"page","pattern":"^\\/neovim\\/?$","segments":[[{"content":"neovim","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neovim/index.astro","pathname":"/neovim","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.15.11_@types+node@2_3de30862c1415149f68bb19865f7ee8f/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://portfolio.cnievaslozano.es","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/neovim/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/neovim/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/neovim/help.astro",{"propagation":"none","containsHead":true}],["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/neovim/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/liwk/Documents/portfolio/portfolio/src/pages/neovim/projects.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.15.11_@types+node@2_3de30862c1415149f68bb19865f7ee8f/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/neovim/about@_@astro":"pages/neovim/about.astro.mjs","\u0000@astro-page:src/pages/neovim/contact@_@astro":"pages/neovim/contact.astro.mjs","\u0000@astro-page:src/pages/neovim/help@_@astro":"pages/neovim/help.astro.mjs","\u0000@astro-page:src/pages/neovim/projects@_@astro":"pages/neovim/projects.astro.mjs","\u0000@astro-page:src/pages/neovim/index@_@astro":"pages/neovim.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BE1c7wXo.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.oNd68Txy.js","/astro/hoisted.js?q=1":"_astro/hoisted.Bftd1UrZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BQxO70ep.css","/_astro/index.lzxXy6dn.css","/astro-vim.png","/demo.gif","/favicon.ico","/neovim.png","/pfp-demo.webp","/pfp.webp","/_astro/hoisted.Bftd1UrZ.js","/_astro/hoisted.oNd68Txy.js","/neovim/about/index.html","/neovim/contact/index.html","/neovim/help/index.html","/neovim/projects/index.html","/neovim/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"TmkvO2qfBpF3eYby3fxVXnhClrAre7UFWNW2Yt8wuZo=","experimentalEnvGetSecretEnabled":false});

export { manifest };
