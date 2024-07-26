"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_SANTHOSH_Nadire_module_federation_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\SANTHOSH\\\\Nadire\\\\module-federation\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_SANTHOSH_Nadire_module_federation_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDU0FOVEhPU0glNUNOYWRpcmUlNUNtb2R1bGUtZmVkZXJhdGlvbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1NBTlRIT1NIJTVDTmFkaXJlJTVDbW9kdWxlLWZlZGVyYXRpb24maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0M7QUFDN0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtYXBwLz85NzY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFNBTlRIT1NIXFxcXE5hZGlyZVxcXFxtb2R1bGUtZmVkZXJhdGlvblxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxTQU5USE9TSFxcXFxOYWRpcmVcXFxcbW9kdWxlLWZlZGVyYXRpb25cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ auth),\n/* harmony export */   POST: () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var _app_constants_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/constants/routes */ \"(rsc)/./app/constants/routes.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/okta */ \"(rsc)/./node_modules/next-auth/providers/okta.js\");\n/* harmony import */ var _utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/generateCsrfToken */ \"(rsc)/./app/api/auth/utils/generateCsrfToken.ts\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _app_services_axiosInstance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/services/axiosInstance */ \"(rsc)/./app/services/axiosInstance.ts\");\n\n\n\n\n\n\nasync function auth(req, res) {\n    return await next_auth__WEBPACK_IMPORTED_MODULE_1___default()(req, res, {\n        providers: [\n            (0,next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n                clientId: process.env.OKTA_OAUTH2_CLIENT_ID,\n                clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET,\n                issuer: process.env.OKTA_OAUTH2_ISSUER\n            })\n        ],\n        callbacks: {\n            jwt: async ({ token, account, profile })=>{\n                if (account && account.access_token) {\n                    token.accessToken = account.access_token;\n                }\n                if (token.csrfToken !== null) {\n                    token.csrfToken = (0,_utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_3__.generateCsrfToken)();\n                }\n                if (profile && profile.sub) {\n                    token.okta_id = profile.sub;\n                }\n                return token;\n            },\n            session: async ({ session, token })=>{\n                if (typeof token.accessToken === \"string\") {\n                    session.user.accessToken = token.accessToken;\n                }\n                if (typeof token.csrfToken === \"string\") {\n                    session.csrfToken = token.csrfToken;\n                }\n                // Add the Okta ID to the session\n                if (typeof token.okta_id === \"string\") {\n                    session.user.okta_id = token.okta_id;\n                }\n                let userDetails = {\n                    data: {}\n                };\n                const postData = {\n                    user: {\n                        name: session.user.name,\n                        email: session.user.email,\n                        okta_id: token.okta_id\n                    },\n                    expires: session.expires,\n                    csrfToken: session.csrfToken\n                };\n                try {\n                    userDetails = await _app_services_axiosInstance__WEBPACK_IMPORTED_MODULE_5__.axiosInstance.post(_app_constants_routes__WEBPACK_IMPORTED_MODULE_0__.OKTA_POST_LOGIN_ROUTE, postData);\n                    if (userDetails?.data?.permissions.length) {\n                        token.permissions = userDetails.data.permissions;\n                    }\n                    if (userDetails?.data?.permissions.length) {\n                        token.permissions = userDetails.data.permissions;\n                    }\n                    if (userDetails?.data?.permissions.length) {\n                        token.permissions = userDetails.data.permissions;\n                    }\n                    if (userDetails?.data?.user_id) {\n                        session.user.id = userDetails.data.user_id;\n                    }\n                    if (userDetails?.data?.okta_id && typeof userDetails.data.okta_id === \"string\") {\n                        session.user.okta_id = userDetails.data.okta_id;\n                    }\n                    if (userDetails.data.access) {\n                        session.access = userDetails.data.access;\n                        (0,next_headers__WEBPACK_IMPORTED_MODULE_4__.cookies)().set(\"accesstoken\", userDetails.data.access);\n                    }\n                } catch (error) {\n                    console.error(\"Error making POST request:\", error);\n                }\n                const userSession = {\n                    ...session,\n                    ...userDetails.data || {}\n                };\n                return userSession;\n            }\n        }\n    });\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0Q7QUFHL0I7QUFDb0I7QUFDVztBQUN4QjtBQUNzQjtBQUc3RCxlQUFlTSxLQUFLQyxHQUFtQixFQUFFQyxHQUFvQjtJQUN6RCxPQUFPLE1BQU1QLGdEQUFRQSxDQUFDTSxLQUFLQyxLQUFLO1FBQzVCQyxXQUFXO1lBQ1RQLG9FQUFZQSxDQUFDO2dCQUNYUSxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLHFCQUFxQjtnQkFDM0NDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCO2dCQUNuREMsUUFBUUwsUUFBUUMsR0FBRyxDQUFDSyxrQkFBa0I7WUFDeEM7U0FDRDtRQUNEQyxXQUFXO1lBQ1RDLEtBQUssT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxFQUFFO2dCQUNyQyxJQUFJRCxXQUFXQSxRQUFRRSxZQUFZLEVBQUU7b0JBQ25DSCxNQUFNSSxXQUFXLEdBQUdILFFBQVFFLFlBQVk7Z0JBQzFDO2dCQUNBLElBQUlILE1BQU1LLFNBQVMsS0FBSyxNQUFNO29CQUM1QkwsTUFBTUssU0FBUyxHQUFHdEIsMkVBQWlCQTtnQkFDckM7Z0JBQ0EsSUFBSW1CLFdBQVdBLFFBQVFJLEdBQUcsRUFBRTtvQkFDMUJOLE1BQU1PLE9BQU8sR0FBR0wsUUFBUUksR0FBRztnQkFDN0I7Z0JBQ0EsT0FBT047WUFDVDtZQUNBUSxTQUFTLE9BQU8sRUFBRUEsT0FBTyxFQUFFUixLQUFLLEVBQUU7Z0JBQ2hDLElBQUksT0FBT0EsTUFBTUksV0FBVyxLQUFLLFVBQVU7b0JBQ3pDSSxRQUFRQyxJQUFJLENBQUNMLFdBQVcsR0FBR0osTUFBTUksV0FBVztnQkFDOUM7Z0JBQ0EsSUFBSSxPQUFPSixNQUFNSyxTQUFTLEtBQUssVUFBVTtvQkFDdkNHLFFBQVFILFNBQVMsR0FBR0wsTUFBTUssU0FBUztnQkFDckM7Z0JBQ0EsaUNBQWlDO2dCQUNqQyxJQUFJLE9BQU9MLE1BQU1PLE9BQU8sS0FBSyxVQUFVO29CQUNyQ0MsUUFBUUMsSUFBSSxDQUFDRixPQUFPLEdBQUdQLE1BQU1PLE9BQU87Z0JBQ3RDO2dCQUVBLElBQUlHLGNBQXNDO29CQUFFQyxNQUFNLENBQUM7Z0JBQWtCO2dCQUNyRSxNQUFNQyxXQUFXO29CQUNmSCxNQUFNO3dCQUNKSSxNQUFNTCxRQUFRQyxJQUFJLENBQUNJLElBQUk7d0JBQ3ZCQyxPQUFPTixRQUFRQyxJQUFJLENBQUNLLEtBQUs7d0JBQ3pCUCxTQUFTUCxNQUFNTyxPQUFPO29CQUN4QjtvQkFDQVEsU0FBU1AsUUFBUU8sT0FBTztvQkFDeEJWLFdBQVdHLFFBQVFILFNBQVM7Z0JBQzlCO2dCQUNBLElBQUk7b0JBQ0ZLLGNBQWMsTUFBTXpCLHNFQUFhQSxDQUFDK0IsSUFBSSxDQUFDcEMsd0VBQXFCQSxFQUFFZ0M7b0JBQzlELElBQUlGLGFBQWFDLE1BQU1NLFlBQVlDLFFBQVE7d0JBQ3pDbEIsTUFBTWlCLFdBQVcsR0FBR1AsWUFBWUMsSUFBSSxDQUFDTSxXQUFXO29CQUNsRDtvQkFDQSxJQUFJUCxhQUFhQyxNQUFNTSxZQUFZQyxRQUFRO3dCQUN6Q2xCLE1BQU1pQixXQUFXLEdBQUdQLFlBQVlDLElBQUksQ0FBQ00sV0FBVztvQkFDbEQ7b0JBQ0EsSUFBSVAsYUFBYUMsTUFBTU0sWUFBWUMsUUFBUTt3QkFDekNsQixNQUFNaUIsV0FBVyxHQUFHUCxZQUFZQyxJQUFJLENBQUNNLFdBQVc7b0JBQ2xEO29CQUNBLElBQUlQLGFBQWFDLE1BQU1RLFNBQVM7d0JBQzlCWCxRQUFRQyxJQUFJLENBQUNXLEVBQUUsR0FBR1YsWUFBWUMsSUFBSSxDQUFDUSxPQUFPO29CQUM1QztvQkFDQSxJQUFJVCxhQUFhQyxNQUFNSixXQUFXLE9BQU9HLFlBQVlDLElBQUksQ0FBQ0osT0FBTyxLQUFLLFVBQVU7d0JBQzlFQyxRQUFRQyxJQUFJLENBQUNGLE9BQU8sR0FBR0csWUFBWUMsSUFBSSxDQUFDSixPQUFPO29CQUNqRDtvQkFDQSxJQUFJRyxZQUFZQyxJQUFJLENBQUNVLE1BQU0sRUFBRTt3QkFDM0JiLFFBQVFhLE1BQU0sR0FBR1gsWUFBWUMsSUFBSSxDQUFDVSxNQUFNO3dCQUN4Q3JDLHFEQUFPQSxHQUFHc0MsR0FBRyxDQUFDLGVBQWVaLFlBQVlDLElBQUksQ0FBQ1UsTUFBTTtvQkFDdEQ7Z0JBQ0YsRUFBRSxPQUFPRSxPQUFPO29CQUNkQyxRQUFRRCxLQUFLLENBQUMsOEJBQThCQTtnQkFDOUM7Z0JBQ0EsTUFBTUUsY0FBYztvQkFBQyxHQUFHakIsT0FBTztvQkFBRSxHQUFJRSxZQUFZQyxJQUFJLElBQUksQ0FBQyxDQUFDO2dCQUFDO2dCQUM1RCxPQUFPYztZQUNUO1FBQ0Y7SUFDQTtBQUNOO0FBQ21DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWFwcC8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0tUQV9QT1NUX0xPR0lOX1JPVVRFIH0gZnJvbSBcIkAvYXBwL2NvbnN0YW50cy9yb3V0ZXNcIjtcbmltcG9ydCB7IElVc2VyRGV0YWlscyB9IGZyb20gXCJAL2FwcC9saWIvbmV4dC1hdXRoXCI7XG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiXG5pbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgT2t0YVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvb2t0YSc7XG5pbXBvcnQgeyBnZW5lcmF0ZUNzcmZUb2tlbiB9IGZyb20gXCIuLi91dGlscy9nZW5lcmF0ZUNzcmZUb2tlblwiO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IGF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiQC9hcHAvc2VydmljZXMvYXhpb3NJbnN0YW5jZVwiO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGF1dGgocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gYXdhaXQgTmV4dEF1dGgocmVxLCByZXMsIHtcbiAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgT2t0YVByb3ZpZGVyKHtcbiAgICAgICAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5PS1RBX09BVVRIMl9DTElFTlRfSUQhLFxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5PS1RBX09BVVRIMl9DTElFTlRfU0VDUkVUISxcbiAgICAgICAgICAgIGlzc3VlcjogcHJvY2Vzcy5lbnYuT0tUQV9PQVVUSDJfSVNTVUVSISxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgand0OiBhc3luYyAoeyB0b2tlbiwgYWNjb3VudCwgcHJvZmlsZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjb3VudCAmJiBhY2NvdW50LmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICB0b2tlbi5hY2Nlc3NUb2tlbiA9IGFjY291bnQuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuLmNzcmZUb2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0b2tlbi5jc3JmVG9rZW4gPSBnZW5lcmF0ZUNzcmZUb2tlbigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvZmlsZSAmJiBwcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICB0b2tlbi5va3RhX2lkID0gcHJvZmlsZS5zdWI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlc3Npb246IGFzeW5jICh7IHNlc3Npb24sIHRva2VuIH0pID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4uYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHNlc3Npb24udXNlci5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbi5jc3JmVG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHNlc3Npb24uY3NyZlRva2VuID0gdG9rZW4uY3NyZlRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBPa3RhIElEIHRvIHRoZSBzZXNzaW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRva2VuLm9rdGFfaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHNlc3Npb24udXNlci5va3RhX2lkID0gdG9rZW4ub2t0YV9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgbGV0IHVzZXJEZXRhaWxzOiB7IGRhdGE6IElVc2VyRGV0YWlscyB9ID0geyBkYXRhOiB7fSBhcyBJVXNlckRldGFpbHMgfTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xuICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogc2Vzc2lvbi51c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICBva3RhX2lkOiB0b2tlbi5va3RhX2lkXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4cGlyZXM6IHNlc3Npb24uZXhwaXJlcyxcbiAgICAgICAgICAgICAgY3NyZlRva2VuOiBzZXNzaW9uLmNzcmZUb2tlblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHVzZXJEZXRhaWxzID0gYXdhaXQgYXhpb3NJbnN0YW5jZS5wb3N0KE9LVEFfUE9TVF9MT0dJTl9ST1VURSwgcG9zdERhdGEpO1xuICAgICAgICAgICAgICBpZiAodXNlckRldGFpbHM/LmRhdGE/LnBlcm1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnBlcm1pc3Npb25zID0gdXNlckRldGFpbHMuZGF0YS5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodXNlckRldGFpbHM/LmRhdGE/LnBlcm1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnBlcm1pc3Npb25zID0gdXNlckRldGFpbHMuZGF0YS5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodXNlckRldGFpbHM/LmRhdGE/LnBlcm1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnBlcm1pc3Npb25zID0gdXNlckRldGFpbHMuZGF0YS5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodXNlckRldGFpbHM/LmRhdGE/LnVzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB1c2VyRGV0YWlscy5kYXRhLnVzZXJfaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHVzZXJEZXRhaWxzPy5kYXRhPy5va3RhX2lkICYmIHR5cGVvZiB1c2VyRGV0YWlscy5kYXRhLm9rdGFfaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLm9rdGFfaWQgPSB1c2VyRGV0YWlscy5kYXRhLm9rdGFfaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHVzZXJEZXRhaWxzLmRhdGEuYWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5hY2Nlc3MgPSB1c2VyRGV0YWlscy5kYXRhLmFjY2VzcztcbiAgICAgICAgICAgICAgICBjb29raWVzKCkuc2V0KCdhY2Nlc3N0b2tlbicsIHVzZXJEZXRhaWxzLmRhdGEuYWNjZXNzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbWFraW5nIFBPU1QgcmVxdWVzdDonLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1c2VyU2Vzc2lvbiA9IHsuLi5zZXNzaW9uLCAuLi4odXNlckRldGFpbHMuZGF0YSB8fCB7fSl9O1xuICAgICAgICAgICAgcmV0dXJuIHVzZXJTZXNzaW9uO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIH0pXG4gIH1cbiAgZXhwb3J0IHthdXRoIGFzIEdFVCwgYXV0aCBhcyBQT1NUfTsiXSwibmFtZXMiOlsiT0tUQV9QT1NUX0xPR0lOX1JPVVRFIiwiTmV4dEF1dGgiLCJPa3RhUHJvdmlkZXIiLCJnZW5lcmF0ZUNzcmZUb2tlbiIsImNvb2tpZXMiLCJheGlvc0luc3RhbmNlIiwiYXV0aCIsInJlcSIsInJlcyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIk9LVEFfT0FVVEgyX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIk9LVEFfT0FVVEgyX0NMSUVOVF9TRUNSRVQiLCJpc3N1ZXIiLCJPS1RBX09BVVRIMl9JU1NVRVIiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImFjY291bnQiLCJwcm9maWxlIiwiYWNjZXNzX3Rva2VuIiwiYWNjZXNzVG9rZW4iLCJjc3JmVG9rZW4iLCJzdWIiLCJva3RhX2lkIiwic2Vzc2lvbiIsInVzZXIiLCJ1c2VyRGV0YWlscyIsImRhdGEiLCJwb3N0RGF0YSIsIm5hbWUiLCJlbWFpbCIsImV4cGlyZXMiLCJwb3N0IiwicGVybWlzc2lvbnMiLCJsZW5ndGgiLCJ1c2VyX2lkIiwiaWQiLCJhY2Nlc3MiLCJzZXQiLCJlcnJvciIsImNvbnNvbGUiLCJ1c2VyU2Vzc2lvbiIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/utils/generateCsrfToken.ts":
/*!*************************************************!*\
  !*** ./app/api/auth/utils/generateCsrfToken.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateCsrfToken: () => (/* binding */ generateCsrfToken)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction generateCsrfToken() {\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(32).toString(\"hex\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdXRpbHMvZ2VuZXJhdGVDc3JmVG9rZW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJCO0FBRXBCLFNBQVNDO0lBQ2QsT0FBT0QseURBQWtCLENBQUMsSUFBSUcsUUFBUSxDQUFDO0FBQ3pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWFwcC8uL2FwcC9hcGkvYXV0aC91dGlscy9nZW5lcmF0ZUNzcmZUb2tlbi50cz9hZGM0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDc3JmVG9rZW4oKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpXG59XG4iXSwibmFtZXMiOlsiY3J5cHRvIiwiZ2VuZXJhdGVDc3JmVG9rZW4iLCJyYW5kb21CeXRlcyIsInRvU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/utils/generateCsrfToken.ts\n");

/***/ }),

/***/ "(rsc)/./app/constants/routes.ts":
/*!*********************************!*\
  !*** ./app/constants/routes.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ACCEPT_INVITATION_ROUTE: () => (/* binding */ ACCEPT_INVITATION_ROUTE),\n/* harmony export */   ADMIN_BANNER_ROUTE: () => (/* binding */ ADMIN_BANNER_ROUTE),\n/* harmony export */   ANSWER_ROUTE: () => (/* binding */ ANSWER_ROUTE),\n/* harmony export */   API_ROUTE: () => (/* binding */ API_ROUTE),\n/* harmony export */   APPLICATION_CONTRIBUTOR_ROUTE: () => (/* binding */ APPLICATION_CONTRIBUTOR_ROUTE),\n/* harmony export */   APPLICATION_NOTES_ROUTE: () => (/* binding */ APPLICATION_NOTES_ROUTE),\n/* harmony export */   APPLICATION_ROUTE: () => (/* binding */ APPLICATION_ROUTE),\n/* harmony export */   ASSIGN_USER_TO_VIEWFLOW_ROUTE: () => (/* binding */ ASSIGN_USER_TO_VIEWFLOW_ROUTE),\n/* harmony export */   AUDIT_ROUTE: () => (/* binding */ AUDIT_ROUTE),\n/* harmony export */   CLOSE_APPLICATION: () => (/* binding */ CLOSE_APPLICATION),\n/* harmony export */   COMPLETE_EVALUATION_TASK: () => (/* binding */ COMPLETE_EVALUATION_TASK),\n/* harmony export */   CREATING_APPLICATION_ROUTE: () => (/* binding */ CREATING_APPLICATION_ROUTE),\n/* harmony export */   DELEGATES_ROUTE: () => (/* binding */ DELEGATES_ROUTE),\n/* harmony export */   DOCUMENT_CATEGORIES_ROUTE: () => (/* binding */ DOCUMENT_CATEGORIES_ROUTE),\n/* harmony export */   DOCUMENT_REQUIRED_ROUTE: () => (/* binding */ DOCUMENT_REQUIRED_ROUTE),\n/* harmony export */   DOCUMENT_TYPES_ENDPOINT: () => (/* binding */ DOCUMENT_TYPES_ENDPOINT),\n/* harmony export */   ELIGIBLE_APPLY_PROGRAMS_ROUTE: () => (/* binding */ ELIGIBLE_APPLY_PROGRAMS_ROUTE),\n/* harmony export */   ENTITIES_ROUTE: () => (/* binding */ ENTITIES_ROUTE),\n/* harmony export */   ENTITY_ROUTE: () => (/* binding */ ENTITY_ROUTE),\n/* harmony export */   FIRM_APPLICATIONS_ROUTE: () => (/* binding */ FIRM_APPLICATIONS_ROUTE),\n/* harmony export */   FIRM_EVALUATIONS_ADD_NOTE_ROUTE: () => (/* binding */ FIRM_EVALUATIONS_ADD_NOTE_ROUTE),\n/* harmony export */   FIRM_EVALUATIONS_ROUTE: () => (/* binding */ FIRM_EVALUATIONS_ROUTE),\n/* harmony export */   GET_DOCUMENTS: () => (/* binding */ GET_DOCUMENTS),\n/* harmony export */   GET_NOTIFICATION: () => (/* binding */ GET_NOTIFICATION),\n/* harmony export */   INBOX_ROUTE: () => (/* binding */ INBOX_ROUTE),\n/* harmony export */   INVITATION_ROUTE: () => (/* binding */ INVITATION_ROUTE),\n/* harmony export */   KAFKA_ROUTE: () => (/* binding */ KAFKA_ROUTE),\n/* harmony export */   MESSAGES_ROUTE: () => (/* binding */ MESSAGES_ROUTE),\n/* harmony export */   NOTES_ROUTE: () => (/* binding */ NOTES_ROUTE),\n/* harmony export */   OKTA_POST_LOGIN_ROUTE: () => (/* binding */ OKTA_POST_LOGIN_ROUTE),\n/* harmony export */   QUESTIONNAIRE_LIST_ROUTE: () => (/* binding */ QUESTIONNAIRE_LIST_ROUTE),\n/* harmony export */   QUESTIONNAIRE_ROUTE: () => (/* binding */ QUESTIONNAIRE_ROUTE),\n/* harmony export */   TASK_TIMERS_ROUTE: () => (/* binding */ TASK_TIMERS_ROUTE),\n/* harmony export */   TESTER_LOGIN_ROUTE: () => (/* binding */ TESTER_LOGIN_ROUTE),\n/* harmony export */   THREADS_ROUTE: () => (/* binding */ THREADS_ROUTE),\n/* harmony export */   UNCLAIMED_ENTITY_ROUTE: () => (/* binding */ UNCLAIMED_ENTITY_ROUTE),\n/* harmony export */   UPDATE_APPLICATION_STATE: () => (/* binding */ UPDATE_APPLICATION_STATE),\n/* harmony export */   USER_PRODUCTIVITY_ROUTE: () => (/* binding */ USER_PRODUCTIVITY_ROUTE),\n/* harmony export */   USER_ROUTE: () => (/* binding */ USER_ROUTE),\n/* harmony export */   USER_TASK_DASHBOARD_ROUTE: () => (/* binding */ USER_TASK_DASHBOARD_ROUTE),\n/* harmony export */   VALIDATE_SAM_ENTITY_ROUTE: () => (/* binding */ VALIDATE_SAM_ENTITY_ROUTE),\n/* harmony export */   WS_LIVE_NOTIFICATIONS: () => (/* binding */ WS_LIVE_NOTIFICATIONS)\n/* harmony export */ });\nconst API_ROUTE = \"https://ucms-internal-api.demo.sba-one.net/api/v1\";\nconst KAFKA_ROUTE = \"/api/kafka/produce\";\nconst DOCUMENT_TYPES_ENDPOINT = API_ROUTE + \"/document-types\";\nconst DOCUMENT_CATEGORIES_ROUTE = API_ROUTE + \"/document-categories\";\nconst UNCLAIMED_ENTITY_ROUTE = API_ROUTE + \"/unclaimed-entity\";\nconst VALIDATE_SAM_ENTITY_ROUTE = API_ROUTE + \"/validate-sam-with-entity-data\";\nconst ENTITIES_ROUTE = API_ROUTE + \"/entities\";\nconst ENTITY_ROUTE = API_ROUTE + \"/entity\";\nconst GET_NOTIFICATION = API_ROUTE + \"/notifications\";\nconst GET_DOCUMENTS = API_ROUTE + \"/documents\";\nconst QUESTIONNAIRE_ROUTE = API_ROUTE + \"/questionnaire\";\nconst WS_LIVE_NOTIFICATIONS = process.env.NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS;\nconst INBOX_ROUTE = API_ROUTE + \"/inbox\";\nconst DOCUMENT_REQUIRED_ROUTE = API_ROUTE + \"/document-required-questions\";\nconst FIRM_APPLICATIONS_ROUTE = API_ROUTE + \"/application\";\nconst FIRM_EVALUATIONS_ROUTE = API_ROUTE + \"/evaluation\";\nconst OKTA_POST_LOGIN_ROUTE = API_ROUTE + \"/okta-post-login\";\nconst ADMIN_BANNER_ROUTE = process.env.NEXT_PUBLIC_ADMIN_FEATURE_ENABLED;\nconst CREATING_APPLICATION_ROUTE = API_ROUTE + \"/creating-program-application\";\nconst ELIGIBLE_APPLY_PROGRAMS_ROUTE = API_ROUTE + \"/application-eligible-to-apply-programs\";\nconst USER_ROUTE = API_ROUTE + \"/users\";\nconst INVITATION_ROUTE = API_ROUTE + \"/invitation\";\nconst UPDATE_APPLICATION_STATE = API_ROUTE + \"/update-application-state\";\nconst APPLICATION_CONTRIBUTOR_ROUTE = API_ROUTE + \"/application-contributors\";\nconst QUESTIONNAIRE_LIST_ROUTE = API_ROUTE + \"/questionnaire-list\";\nconst ANSWER_ROUTE = API_ROUTE + \"/answer\";\nconst ACCEPT_INVITATION_ROUTE = API_ROUTE + \"/accept-invitation\";\nconst USER_PRODUCTIVITY_ROUTE = API_ROUTE + \"/user-productivity-dashboard\";\nconst FIRM_EVALUATIONS_ADD_NOTE_ROUTE = API_ROUTE + \"/upsert-viewflow-note\";\nconst ASSIGN_USER_TO_VIEWFLOW_ROUTE = API_ROUTE + \"/assign-user-to-viewflow\";\nconst DELEGATES_ROUTE = API_ROUTE + \"/delegates\";\nconst APPLICATION_ROUTE = API_ROUTE + \"/application\";\nconst TESTER_LOGIN_ROUTE = API_ROUTE + \"/login\";\nconst USER_TASK_DASHBOARD_ROUTE = API_ROUTE + \"/user-task-dashboard\";\nconst APPLICATION_NOTES_ROUTE = API_ROUTE + \"/application-notes\";\nconst NOTES_ROUTE = API_ROUTE + \"/notes\";\nconst MESSAGES_ROUTE = API_ROUTE + \"/messages\";\nconst THREADS_ROUTE = API_ROUTE + \"/threads\";\nconst TASK_TIMERS_ROUTE = API_ROUTE + \"/task-timers\"; // this route does not exist, it is a placeholder\nconst AUDIT_ROUTE = API_ROUTE + \"/audit\"; // this route does not exist, it is a placeholder [mdev]\nconst COMPLETE_EVALUATION_TASK = API_ROUTE + \"/complete-evaluation-task\";\nconst CLOSE_APPLICATION = API_ROUTE + \"/close-application\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvY29uc3RhbnRzL3JvdXRlcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxZQUFZQyxtREFBK0I7QUFDakQsTUFBTUcsY0FBYyxxQkFBb0I7QUFDeEMsTUFBTUMsMEJBQTBCTCxZQUFZLGtCQUFpQjtBQUM3RCxNQUFNTSw0QkFBNEJOLFlBQVksdUJBQXNCO0FBQ3BFLE1BQU1PLHlCQUF5QlAsWUFBWSxvQkFBbUI7QUFDOUQsTUFBTVEsNEJBQ1hSLFlBQVksaUNBQWdDO0FBQ3ZDLE1BQU1TLGlCQUFpQlQsWUFBWSxZQUFXO0FBQzlDLE1BQU1VLGVBQWVWLFlBQVksVUFBUztBQUMxQyxNQUFNVyxtQkFBbUJYLFlBQVksaUJBQWdCO0FBQ3JELE1BQU1ZLGdCQUFnQlosWUFBWSxhQUFZO0FBQzlDLE1BQU1hLHNCQUFzQmIsWUFBWSxpQkFBZ0I7QUFDeEQsTUFBTWMsd0JBQ1hiLFFBQVFDLEdBQUcsQ0FBQ2EsaUNBQWlDO0FBQ3hDLE1BQU1DLGNBQWNoQixZQUFZLFNBQVE7QUFDeEMsTUFBTWlCLDBCQUNYakIsWUFBWSwrQkFBOEI7QUFDckMsTUFBTWtCLDBCQUEwQmxCLFlBQVksZUFBYztBQUMxRCxNQUFNbUIseUJBQXlCbkIsWUFBWSxjQUFhO0FBQ3hELE1BQU1vQix3QkFBd0JwQixZQUFZLG1CQUFrQjtBQUM1RCxNQUFNcUIscUJBQXFCcEIsUUFBUUMsR0FBRyxDQUFDb0IsaUNBQWlDO0FBQ3hFLE1BQU1DLDZCQUE2QnZCLFlBQVksZ0NBQStCO0FBQzlFLE1BQU13QixnQ0FBZ0N4QixZQUFZLDBDQUF5QztBQUMzRixNQUFNeUIsYUFBYXpCLFlBQVksU0FBUTtBQUN2QyxNQUFNMEIsbUJBQW1CMUIsWUFBWSxjQUFhO0FBQ2xELE1BQU0yQiwyQkFBMkIzQixZQUFZLDRCQUEyQjtBQUN4RSxNQUFNNEIsZ0NBQWdDNUIsWUFBWSw0QkFBMkI7QUFDN0UsTUFBTTZCLDJCQUEyQjdCLFlBQVksc0JBQXNCO0FBQ25FLE1BQU04QixlQUFlOUIsWUFBWSxVQUFTO0FBRTFDLE1BQU0rQiwwQkFBMEIvQixZQUFZLHFCQUFvQjtBQUNoRSxNQUFNZ0MsMEJBQ1hoQyxZQUFZLCtCQUE4QjtBQUNyQyxNQUFNaUMsa0NBQ1hqQyxZQUFZLHdCQUF1QjtBQUM5QixNQUFNa0MsZ0NBQWdDbEMsWUFBWSwyQkFBMEI7QUFDNUUsTUFBTW1DLGtCQUFrQm5DLFlBQVksYUFBWTtBQUNoRCxNQUFNb0Msb0JBQW9CcEMsWUFBWSxlQUFjO0FBQ3BELE1BQU1xQyxxQkFBcUJyQyxZQUFZLFNBQVE7QUFDL0MsTUFBTXNDLDRCQUE0QnRDLFlBQVksdUJBQXVCO0FBQ3JFLE1BQU11QywwQkFBMEJ2QyxZQUFZLHFCQUFxQjtBQUNqRSxNQUFNd0MsY0FBY3hDLFlBQVksU0FBUztBQUN6QyxNQUFNeUMsaUJBQWlCekMsWUFBWSxZQUFZO0FBQy9DLE1BQU0wQyxnQkFBZ0IxQyxZQUFZLFdBQVc7QUFDN0MsTUFBTTJDLG9CQUFvQjNDLFlBQVksZUFBZSxDQUFDLGlEQUFpRDtBQUN2RyxNQUFNNEMsY0FBYzVDLFlBQVksU0FBUyxDQUFDLHdEQUF3RDtBQUNsRyxNQUFNNkMsMkJBQTJCN0MsWUFBWSw0QkFBNEI7QUFDekUsTUFBTThDLG9CQUFvQjlDLFlBQVkscUJBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWFwcC8uL2FwcC9jb25zdGFudHMvcm91dGVzLnRzPzlmYmYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSV9ST1VURSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkxcbmV4cG9ydCBjb25zdCBLQUZLQV9ST1VURSA9ICcvYXBpL2thZmthL3Byb2R1Y2UnXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfVFlQRVNfRU5EUE9JTlQgPSBBUElfUk9VVEUgKyAnL2RvY3VtZW50LXR5cGVzJ1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX0NBVEVHT1JJRVNfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2RvY3VtZW50LWNhdGVnb3JpZXMnXG5leHBvcnQgY29uc3QgVU5DTEFJTUVEX0VOVElUWV9ST1VURSA9IEFQSV9ST1VURSArICcvdW5jbGFpbWVkLWVudGl0eSdcbmV4cG9ydCBjb25zdCBWQUxJREFURV9TQU1fRU5USVRZX1JPVVRFID1cbiAgQVBJX1JPVVRFICsgJy92YWxpZGF0ZS1zYW0td2l0aC1lbnRpdHktZGF0YSdcbmV4cG9ydCBjb25zdCBFTlRJVElFU19ST1VURSA9IEFQSV9ST1VURSArICcvZW50aXRpZXMnXG5leHBvcnQgY29uc3QgRU5USVRZX1JPVVRFID0gQVBJX1JPVVRFICsgJy9lbnRpdHknXG5leHBvcnQgY29uc3QgR0VUX05PVElGSUNBVElPTiA9IEFQSV9ST1VURSArICcvbm90aWZpY2F0aW9ucydcbmV4cG9ydCBjb25zdCBHRVRfRE9DVU1FTlRTID0gQVBJX1JPVVRFICsgJy9kb2N1bWVudHMnXG5leHBvcnQgY29uc3QgUVVFU1RJT05OQUlSRV9ST1VURSA9IEFQSV9ST1VURSArICcvcXVlc3Rpb25uYWlyZSdcbmV4cG9ydCBjb25zdCBXU19MSVZFX05PVElGSUNBVElPTlMgPVxuICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19XU19MSVZFX05PVElGSUNBVElPTlNcbmV4cG9ydCBjb25zdCBJTkJPWF9ST1VURSA9IEFQSV9ST1VURSArICcvaW5ib3gnXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfUkVRVUlSRURfUk9VVEUgPVxuICBBUElfUk9VVEUgKyAnL2RvY3VtZW50LXJlcXVpcmVkLXF1ZXN0aW9ucydcbmV4cG9ydCBjb25zdCBGSVJNX0FQUExJQ0FUSU9OU19ST1VURSA9IEFQSV9ST1VURSArICcvYXBwbGljYXRpb24nXG5leHBvcnQgY29uc3QgRklSTV9FVkFMVUFUSU9OU19ST1VURSA9IEFQSV9ST1VURSArICcvZXZhbHVhdGlvbidcbmV4cG9ydCBjb25zdCBPS1RBX1BPU1RfTE9HSU5fUk9VVEUgPSBBUElfUk9VVEUgKyAnL29rdGEtcG9zdC1sb2dpbidcbmV4cG9ydCBjb25zdCBBRE1JTl9CQU5ORVJfUk9VVEUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BRE1JTl9GRUFUVVJFX0VOQUJMRURcbmV4cG9ydCBjb25zdCBDUkVBVElOR19BUFBMSUNBVElPTl9ST1VURSA9IEFQSV9ST1VURSArICcvY3JlYXRpbmctcHJvZ3JhbS1hcHBsaWNhdGlvbidcbmV4cG9ydCBjb25zdCBFTElHSUJMRV9BUFBMWV9QUk9HUkFNU19ST1VURSA9IEFQSV9ST1VURSArICcvYXBwbGljYXRpb24tZWxpZ2libGUtdG8tYXBwbHktcHJvZ3JhbXMnXG5leHBvcnQgY29uc3QgVVNFUl9ST1VURSA9IEFQSV9ST1VURSArICcvdXNlcnMnXG5leHBvcnQgY29uc3QgSU5WSVRBVElPTl9ST1VURSA9IEFQSV9ST1VURSArICcvaW52aXRhdGlvbidcbmV4cG9ydCBjb25zdCBVUERBVEVfQVBQTElDQVRJT05fU1RBVEUgPSBBUElfUk9VVEUgKyAnL3VwZGF0ZS1hcHBsaWNhdGlvbi1zdGF0ZSdcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9DT05UUklCVVRPUl9ST1VURSA9IEFQSV9ST1VURSArICcvYXBwbGljYXRpb24tY29udHJpYnV0b3JzJ1xuZXhwb3J0IGNvbnN0IFFVRVNUSU9OTkFJUkVfTElTVF9ST1VURSA9IEFQSV9ST1VURSArICcvcXVlc3Rpb25uYWlyZS1saXN0JztcbmV4cG9ydCBjb25zdCBBTlNXRVJfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2Fuc3dlcidcblxuZXhwb3J0IGNvbnN0IEFDQ0VQVF9JTlZJVEFUSU9OX1JPVVRFID0gQVBJX1JPVVRFICsgJy9hY2NlcHQtaW52aXRhdGlvbidcbmV4cG9ydCBjb25zdCBVU0VSX1BST0RVQ1RJVklUWV9ST1VURSA9XG4gIEFQSV9ST1VURSArICcvdXNlci1wcm9kdWN0aXZpdHktZGFzaGJvYXJkJ1xuZXhwb3J0IGNvbnN0IEZJUk1fRVZBTFVBVElPTlNfQUREX05PVEVfUk9VVEUgPVxuICBBUElfUk9VVEUgKyAnL3Vwc2VydC12aWV3Zmxvdy1ub3RlJ1xuZXhwb3J0IGNvbnN0IEFTU0lHTl9VU0VSX1RPX1ZJRVdGTE9XX1JPVVRFID0gQVBJX1JPVVRFICsgJy9hc3NpZ24tdXNlci10by12aWV3ZmxvdydcbmV4cG9ydCBjb25zdCBERUxFR0FURVNfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2RlbGVnYXRlcydcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9ST1VURSA9IEFQSV9ST1VURSArICcvYXBwbGljYXRpb24nXG5leHBvcnQgY29uc3QgVEVTVEVSX0xPR0lOX1JPVVRFID0gQVBJX1JPVVRFICsgJy9sb2dpbidcbmV4cG9ydCBjb25zdCBVU0VSX1RBU0tfREFTSEJPQVJEX1JPVVRFID0gQVBJX1JPVVRFICsgJy91c2VyLXRhc2stZGFzaGJvYXJkJztcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9OT1RFU19ST1VURSA9IEFQSV9ST1VURSArICcvYXBwbGljYXRpb24tbm90ZXMnO1xuZXhwb3J0IGNvbnN0IE5PVEVTX1JPVVRFID0gQVBJX1JPVVRFICsgJy9ub3Rlcyc7XG5leHBvcnQgY29uc3QgTUVTU0FHRVNfUk9VVEUgPSBBUElfUk9VVEUgKyAnL21lc3NhZ2VzJztcbmV4cG9ydCBjb25zdCBUSFJFQURTX1JPVVRFID0gQVBJX1JPVVRFICsgJy90aHJlYWRzJztcbmV4cG9ydCBjb25zdCBUQVNLX1RJTUVSU19ST1VURSA9IEFQSV9ST1VURSArICcvdGFzay10aW1lcnMnOyAvLyB0aGlzIHJvdXRlIGRvZXMgbm90IGV4aXN0LCBpdCBpcyBhIHBsYWNlaG9sZGVyXG5leHBvcnQgY29uc3QgQVVESVRfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2F1ZGl0JzsgLy8gdGhpcyByb3V0ZSBkb2VzIG5vdCBleGlzdCwgaXQgaXMgYSBwbGFjZWhvbGRlciBbbWRldl1cbmV4cG9ydCBjb25zdCBDT01QTEVURV9FVkFMVUFUSU9OX1RBU0sgPSBBUElfUk9VVEUgKyAnL2NvbXBsZXRlLWV2YWx1YXRpb24tdGFzayc7XG5leHBvcnQgY29uc3QgQ0xPU0VfQVBQTElDQVRJT04gPSBBUElfUk9VVEUgKyAnL2Nsb3NlLWFwcGxpY2F0aW9uJzsiXSwibmFtZXMiOlsiQVBJX1JPVVRFIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJLQUZLQV9ST1VURSIsIkRPQ1VNRU5UX1RZUEVTX0VORFBPSU5UIiwiRE9DVU1FTlRfQ0FURUdPUklFU19ST1VURSIsIlVOQ0xBSU1FRF9FTlRJVFlfUk9VVEUiLCJWQUxJREFURV9TQU1fRU5USVRZX1JPVVRFIiwiRU5USVRJRVNfUk9VVEUiLCJFTlRJVFlfUk9VVEUiLCJHRVRfTk9USUZJQ0FUSU9OIiwiR0VUX0RPQ1VNRU5UUyIsIlFVRVNUSU9OTkFJUkVfUk9VVEUiLCJXU19MSVZFX05PVElGSUNBVElPTlMiLCJORVhUX1BVQkxJQ19XU19MSVZFX05PVElGSUNBVElPTlMiLCJJTkJPWF9ST1VURSIsIkRPQ1VNRU5UX1JFUVVJUkVEX1JPVVRFIiwiRklSTV9BUFBMSUNBVElPTlNfUk9VVEUiLCJGSVJNX0VWQUxVQVRJT05TX1JPVVRFIiwiT0tUQV9QT1NUX0xPR0lOX1JPVVRFIiwiQURNSU5fQkFOTkVSX1JPVVRFIiwiTkVYVF9QVUJMSUNfQURNSU5fRkVBVFVSRV9FTkFCTEVEIiwiQ1JFQVRJTkdfQVBQTElDQVRJT05fUk9VVEUiLCJFTElHSUJMRV9BUFBMWV9QUk9HUkFNU19ST1VURSIsIlVTRVJfUk9VVEUiLCJJTlZJVEFUSU9OX1JPVVRFIiwiVVBEQVRFX0FQUExJQ0FUSU9OX1NUQVRFIiwiQVBQTElDQVRJT05fQ09OVFJJQlVUT1JfUk9VVEUiLCJRVUVTVElPTk5BSVJFX0xJU1RfUk9VVEUiLCJBTlNXRVJfUk9VVEUiLCJBQ0NFUFRfSU5WSVRBVElPTl9ST1VURSIsIlVTRVJfUFJPRFVDVElWSVRZX1JPVVRFIiwiRklSTV9FVkFMVUFUSU9OU19BRERfTk9URV9ST1VURSIsIkFTU0lHTl9VU0VSX1RPX1ZJRVdGTE9XX1JPVVRFIiwiREVMRUdBVEVTX1JPVVRFIiwiQVBQTElDQVRJT05fUk9VVEUiLCJURVNURVJfTE9HSU5fUk9VVEUiLCJVU0VSX1RBU0tfREFTSEJPQVJEX1JPVVRFIiwiQVBQTElDQVRJT05fTk9URVNfUk9VVEUiLCJOT1RFU19ST1VURSIsIk1FU1NBR0VTX1JPVVRFIiwiVEhSRUFEU19ST1VURSIsIlRBU0tfVElNRVJTX1JPVVRFIiwiQVVESVRfUk9VVEUiLCJDT01QTEVURV9FVkFMVUFUSU9OX1RBU0siLCJDTE9TRV9BUFBMSUNBVElPTiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/constants/routes.ts\n");

/***/ }),

/***/ "(rsc)/./app/services/axiosInstance.ts":
/*!***************************************!*\
  !*** ./app/services/axiosInstance.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   axiosInstance: () => (/* binding */ axiosInstance)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _constants_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/routes */ \"(rsc)/./app/constants/routes.ts\");\n\n\nconst isServer = \"undefined\" === \"undefined\";\nconst cookiesInterceptor = async (req)=>{\n    if (isServer) {\n        const { cookies } = await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\"));\n        req.headers[\"Authorization\"] = `Bearer ${cookies().get(\"accesstoken\")}`;\n    } else {\n        const cookies = await __webpack_require__.e(/*! import() */ \"vendor-chunks/js-cookie\").then(__webpack_require__.bind(__webpack_require__, /*! js-cookie */ \"(rsc)/./node_modules/js-cookie/dist/js.cookie.mjs\"));\n        req.headers[\"Authorization\"] = `Bearer ${cookies.default.get(\"accesstoken\")}`;\n    }\n    return req;\n};\nconst axiosInstance = axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n    baseURL: _constants_routes__WEBPACK_IMPORTED_MODULE_0__.API_ROUTE,\n    timeout: 30 * 60000,\n    headers: {\n        Accept: \"application/json, text/plain, */*\",\n        \"Content-Type\": \"application/json; charset=utf-8\"\n    }\n});\naxiosInstance.interceptors.request.use(cookiesInterceptor);\naxiosInstance.interceptors.response.use(cookiesInterceptor);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvc2VydmljZXMvYXhpb3NJbnN0YW5jZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBeUI7QUFDc0I7QUFFL0MsTUFBTUUsV0FBVyxnQkFBa0I7QUFFbkMsTUFBTUMscUJBQXFCLE9BQU9DO0lBQ2hDLElBQUlGLFVBQVU7UUFDWixNQUFNLEVBQUVHLE9BQU8sRUFBRSxHQUFJLE1BQU0seUpBQXNCO1FBQ2pERCxJQUFJRSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUVELFVBQVVFLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFDekUsT0FBTztRQUNMLE1BQU1GLFVBQVcsTUFBTSwwTEFBbUI7UUFDMUNELElBQUlFLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLE9BQU8sRUFBRUQsUUFBUUcsT0FBTyxDQUFDRCxHQUFHLENBQUMsZUFBZSxDQUFDO0lBQy9FO0lBQ0EsT0FBT0g7QUFDVDtBQUVPLE1BQU1LLGdCQUFnQlQsNkNBQUtBLENBQUNVLE1BQU0sQ0FBQztJQUN0Q0MsU0FBU1Ysd0RBQVNBO0lBQ2xCVyxTQUFTLEtBQUs7SUFDZE4sU0FBUztRQUNQTyxRQUFRO1FBQ1IsZ0JBQWdCO0lBQ2xCO0FBQ0YsR0FBRTtBQUVKSixjQUFjSyxZQUFZLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDYjtBQUN2Q00sY0FBY0ssWUFBWSxDQUFDRyxRQUFRLENBQUNELEdBQUcsQ0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtYXBwLy4vYXBwL3NlcnZpY2VzL2F4aW9zSW5zdGFuY2UudHM/ZTRjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcbmltcG9ydCB7IEFQSV9ST1VURSB9IGZyb20gXCIuLi9jb25zdGFudHMvcm91dGVzXCJcblxuY29uc3QgaXNTZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiXG5cbmNvbnN0IGNvb2tpZXNJbnRlcmNlcHRvciA9IGFzeW5jIChyZXE6IGFueSkgPT4ge1xuICBpZiAoaXNTZXJ2ZXIpIHtcbiAgICBjb25zdCB7IGNvb2tpZXMgfSA9IChhd2FpdCBpbXBvcnQoXCJuZXh0L2hlYWRlcnNcIikpXG4gICAgcmVxLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtjb29raWVzKCkuZ2V0KCdhY2Nlc3N0b2tlbicpfWBcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjb29raWVzID0gKGF3YWl0IGltcG9ydChcImpzLWNvb2tpZVwiKSlcbiAgICByZXEuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke2Nvb2tpZXMuZGVmYXVsdC5nZXQoJ2FjY2Vzc3Rva2VuJyl9YFxuICB9XG4gIHJldHVybiByZXFcbn1cblxuZXhwb3J0IGNvbnN0IGF4aW9zSW5zdGFuY2UgPSBheGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6IEFQSV9ST1VURSxcbiAgICB0aW1lb3V0OiAzMCAqIDYwXzAwMCwgLy8gMzAgbWludXRlc1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgIH0sXG4gIH0pXG5cbmF4aW9zSW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGNvb2tpZXNJbnRlcmNlcHRvcilcbmF4aW9zSW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShjb29raWVzSW50ZXJjZXB0b3IpIl0sIm5hbWVzIjpbImF4aW9zIiwiQVBJX1JPVVRFIiwiaXNTZXJ2ZXIiLCJjb29raWVzSW50ZXJjZXB0b3IiLCJyZXEiLCJjb29raWVzIiwiaGVhZGVycyIsImdldCIsImRlZmF1bHQiLCJheGlvc0luc3RhbmNlIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJBY2NlcHQiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwicmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/services/axiosInstance.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/@babel","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/object-hash","vendor-chunks/form-data","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/asynckit","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/oidc-token-hash","vendor-chunks/proxy-from-env","vendor-chunks/@panva","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/delayed-stream","vendor-chunks/has-flag"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();