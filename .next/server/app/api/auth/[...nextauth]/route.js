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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _app_lib_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/lib/auth */ \"(rsc)/./app/lib/auth.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_1___default()(_app_lib_auth__WEBPACK_IMPORTED_MODULE_0__.authConfig);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNYO0FBRWhDLE1BQU1FLFVBQVVELGdEQUFRQSxDQUFDRCxxREFBVUE7QUFDTyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1hcHAvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dGhDb25maWcgfSBmcm9tICdAL2FwcC9saWIvYXV0aCdcbmltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnXG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoQ29uZmlnKVxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XG4iXSwibmFtZXMiOlsiYXV0aENvbmZpZyIsIk5leHRBdXRoIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ACCEPT_INVITATION_ROUTE: () => (/* binding */ ACCEPT_INVITATION_ROUTE),\n/* harmony export */   ADMIN_BANNER_ROUTE: () => (/* binding */ ADMIN_BANNER_ROUTE),\n/* harmony export */   ANSWER_ROUTE: () => (/* binding */ ANSWER_ROUTE),\n/* harmony export */   API_ROUTE: () => (/* binding */ API_ROUTE),\n/* harmony export */   APPLICATION_CONTRIBUTOR_ROUTE: () => (/* binding */ APPLICATION_CONTRIBUTOR_ROUTE),\n/* harmony export */   APPLICATION_NOTES_ROUTE: () => (/* binding */ APPLICATION_NOTES_ROUTE),\n/* harmony export */   APPLICATION_ROUTE: () => (/* binding */ APPLICATION_ROUTE),\n/* harmony export */   CREATING_APPLICATION_ROUTE: () => (/* binding */ CREATING_APPLICATION_ROUTE),\n/* harmony export */   DELEGATES_ROUTE: () => (/* binding */ DELEGATES_ROUTE),\n/* harmony export */   DOCUMENT_CATEGORIES_ROUTE: () => (/* binding */ DOCUMENT_CATEGORIES_ROUTE),\n/* harmony export */   DOCUMENT_REQUIRED_ROUTE: () => (/* binding */ DOCUMENT_REQUIRED_ROUTE),\n/* harmony export */   DOCUMENT_TYPES_ENDPOINT: () => (/* binding */ DOCUMENT_TYPES_ENDPOINT),\n/* harmony export */   ELIGIBLE_APPLY_PROGRAMS_ROUTE: () => (/* binding */ ELIGIBLE_APPLY_PROGRAMS_ROUTE),\n/* harmony export */   ENTITIES_ROUTE: () => (/* binding */ ENTITIES_ROUTE),\n/* harmony export */   ENTITY_ROUTE: () => (/* binding */ ENTITY_ROUTE),\n/* harmony export */   FIRM_APPLICATIONS_ROUTE: () => (/* binding */ FIRM_APPLICATIONS_ROUTE),\n/* harmony export */   FIRM_EVALUATIONS_ADD_NOTE_ROUTE: () => (/* binding */ FIRM_EVALUATIONS_ADD_NOTE_ROUTE),\n/* harmony export */   FIRM_EVALUATIONS_ASSIGN_USER_ROUTE: () => (/* binding */ FIRM_EVALUATIONS_ASSIGN_USER_ROUTE),\n/* harmony export */   FIRM_EVALUATIONS_ROUTE: () => (/* binding */ FIRM_EVALUATIONS_ROUTE),\n/* harmony export */   GET_DOCUMENTS: () => (/* binding */ GET_DOCUMENTS),\n/* harmony export */   GET_NOTIFICATION: () => (/* binding */ GET_NOTIFICATION),\n/* harmony export */   GET_USER_PROFILE: () => (/* binding */ GET_USER_PROFILE),\n/* harmony export */   INBOX_ROUTE: () => (/* binding */ INBOX_ROUTE),\n/* harmony export */   INVITATION_ROUTE: () => (/* binding */ INVITATION_ROUTE),\n/* harmony export */   KAFKA_ROUTE: () => (/* binding */ KAFKA_ROUTE),\n/* harmony export */   OKTA_POST_LOGIN_ROUTE: () => (/* binding */ OKTA_POST_LOGIN_ROUTE),\n/* harmony export */   QUESTIONNAIRE_LIST_ROUTE: () => (/* binding */ QUESTIONNAIRE_LIST_ROUTE),\n/* harmony export */   QUESTIONNAIRE_ROUTE: () => (/* binding */ QUESTIONNAIRE_ROUTE),\n/* harmony export */   TESTER_LOGIN_ROUTE: () => (/* binding */ TESTER_LOGIN_ROUTE),\n/* harmony export */   UNCLAIMED_ENTITY_ROUTE: () => (/* binding */ UNCLAIMED_ENTITY_ROUTE),\n/* harmony export */   UPDATE_APPLICATION_STATE: () => (/* binding */ UPDATE_APPLICATION_STATE),\n/* harmony export */   USER_PRODUCTIVITY_ROUTE: () => (/* binding */ USER_PRODUCTIVITY_ROUTE),\n/* harmony export */   USER_ROUTE: () => (/* binding */ USER_ROUTE),\n/* harmony export */   USER_TASK_DASHBOARD_ROUTE: () => (/* binding */ USER_TASK_DASHBOARD_ROUTE),\n/* harmony export */   VALIDATE_SAM_ENTITY_ROUTE: () => (/* binding */ VALIDATE_SAM_ENTITY_ROUTE),\n/* harmony export */   WS_LIVE_NOTIFICATIONS: () => (/* binding */ WS_LIVE_NOTIFICATIONS)\n/* harmony export */ });\nconst API_ROUTE = \"https://ucms-internal-api.demo.sba-one.net/api/v1\";\nconst KAFKA_ROUTE = \"/api/kafka/produce\";\nconst DOCUMENT_TYPES_ENDPOINT = API_ROUTE + \"/document-types\";\nconst DOCUMENT_CATEGORIES_ROUTE = API_ROUTE + \"/document-categories\";\nconst UNCLAIMED_ENTITY_ROUTE = API_ROUTE + \"/unclaimed-entity\";\nconst VALIDATE_SAM_ENTITY_ROUTE = API_ROUTE + \"/validate-sam-with-entity-data\";\nconst ENTITIES_ROUTE = API_ROUTE + \"/entities\";\nconst ENTITY_ROUTE = API_ROUTE + \"/entity\";\nconst GET_NOTIFICATION = API_ROUTE + \"/notifications\";\nconst GET_DOCUMENTS = API_ROUTE + \"/documents\";\nconst GET_USER_PROFILE = API_ROUTE + \"/users/\";\nconst QUESTIONNAIRE_ROUTE = API_ROUTE + \"/questionnaire\";\nconst WS_LIVE_NOTIFICATIONS = process.env.NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS;\nconst INBOX_ROUTE = API_ROUTE + \"/inbox\";\nconst DOCUMENT_REQUIRED_ROUTE = API_ROUTE + \"/document-required-questions\";\nconst FIRM_APPLICATIONS_ROUTE = API_ROUTE + \"/application\";\nconst FIRM_EVALUATIONS_ROUTE = API_ROUTE + \"/evaluation\";\nconst OKTA_POST_LOGIN_ROUTE = API_ROUTE + \"/okta-post-login\";\nconst ADMIN_BANNER_ROUTE = process.env.NEXT_PUBLIC_ADMIN_FEATURE_ENABLED;\nconst CREATING_APPLICATION_ROUTE = API_ROUTE + \"/creating-program-application\";\nconst ELIGIBLE_APPLY_PROGRAMS_ROUTE = API_ROUTE + \"/application-eligible-to-apply-programs\";\nconst USER_ROUTE = API_ROUTE + \"/users\";\nconst INVITATION_ROUTE = API_ROUTE + \"/invitation\";\nconst UPDATE_APPLICATION_STATE = API_ROUTE + \"/update-application-state\";\nconst APPLICATION_CONTRIBUTOR_ROUTE = API_ROUTE + \"/application-contributors\";\nconst QUESTIONNAIRE_LIST_ROUTE = API_ROUTE + \"/questionnaire-list\";\nconst ANSWER_ROUTE = API_ROUTE + \"/answer\";\nconst ACCEPT_INVITATION_ROUTE = API_ROUTE + \"/accept-invitation\";\nconst USER_PRODUCTIVITY_ROUTE = API_ROUTE + \"/user-productivity-dashboard\";\nconst FIRM_EVALUATIONS_ADD_NOTE_ROUTE = API_ROUTE + \"/upsert-viewflow-note\";\nconst FIRM_EVALUATIONS_ASSIGN_USER_ROUTE = API_ROUTE + \"/assign-user-to-viewflow\";\nconst DELEGATES_ROUTE = API_ROUTE + \"/delegates\";\nconst APPLICATION_ROUTE = API_ROUTE + \"/application\";\nconst TESTER_LOGIN_ROUTE = API_ROUTE + \"/login\";\nconst USER_TASK_DASHBOARD_ROUTE = API_ROUTE + \"/user-task-dashboard\";\nconst APPLICATION_NOTES_ROUTE = API_ROUTE + \"/application-notes\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvY29uc3RhbnRzL3JvdXRlcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxZQUFZQyxtREFBK0I7QUFDakQsTUFBTUcsY0FBYyxxQkFBb0I7QUFDeEMsTUFBTUMsMEJBQTBCTCxZQUFZLGtCQUFpQjtBQUM3RCxNQUFNTSw0QkFBNEJOLFlBQVksdUJBQXNCO0FBQ3BFLE1BQU1PLHlCQUF5QlAsWUFBWSxvQkFBbUI7QUFDOUQsTUFBTVEsNEJBQ1hSLFlBQVksaUNBQWdDO0FBQ3ZDLE1BQU1TLGlCQUFpQlQsWUFBWSxZQUFXO0FBQzlDLE1BQU1VLGVBQWVWLFlBQVksVUFBUztBQUMxQyxNQUFNVyxtQkFBbUJYLFlBQVksaUJBQWdCO0FBQ3JELE1BQU1ZLGdCQUFnQlosWUFBWSxhQUFZO0FBQzlDLE1BQU1hLG1CQUFtQmIsWUFBWSxVQUFTO0FBQzlDLE1BQU1jLHNCQUFzQmQsWUFBWSxpQkFBZ0I7QUFDeEQsTUFBTWUsd0JBQ1hkLFFBQVFDLEdBQUcsQ0FBQ2MsaUNBQWlDO0FBQ3hDLE1BQU1DLGNBQWNqQixZQUFZLFNBQVE7QUFDeEMsTUFBTWtCLDBCQUNYbEIsWUFBWSwrQkFBOEI7QUFDckMsTUFBTW1CLDBCQUEwQm5CLFlBQVksZUFBYztBQUMxRCxNQUFNb0IseUJBQXlCcEIsWUFBWSxjQUFhO0FBQ3hELE1BQU1xQix3QkFBd0JyQixZQUFZLG1CQUFrQjtBQUM1RCxNQUFNc0IscUJBQXFCckIsUUFBUUMsR0FBRyxDQUFDcUIsaUNBQWlDO0FBQ3hFLE1BQU1DLDZCQUE2QnhCLFlBQVksZ0NBQStCO0FBQzlFLE1BQU15QixnQ0FBZ0N6QixZQUFZLDBDQUF5QztBQUMzRixNQUFNMEIsYUFBYTFCLFlBQVksU0FBUTtBQUN2QyxNQUFNMkIsbUJBQW1CM0IsWUFBWSxjQUFhO0FBQ2xELE1BQU00QiwyQkFBMkI1QixZQUFZLDRCQUEyQjtBQUN4RSxNQUFNNkIsZ0NBQWdDN0IsWUFBWSw0QkFBMkI7QUFDN0UsTUFBTThCLDJCQUEyQjlCLFlBQVksc0JBQXNCO0FBQ25FLE1BQU0rQixlQUFlL0IsWUFBWSxVQUFTO0FBRTFDLE1BQU1nQywwQkFBMEJoQyxZQUFZLHFCQUFvQjtBQUNoRSxNQUFNaUMsMEJBQ1hqQyxZQUFZLCtCQUE4QjtBQUNyQyxNQUFNa0Msa0NBQ1hsQyxZQUFZLHdCQUF1QjtBQUM5QixNQUFNbUMscUNBQXFDbkMsWUFBWSwyQkFBMEI7QUFDakYsTUFBTW9DLGtCQUFrQnBDLFlBQVksYUFBWTtBQUNoRCxNQUFNcUMsb0JBQW9CckMsWUFBWSxlQUFjO0FBQ3BELE1BQU1zQyxxQkFBcUJ0QyxZQUFZLFNBQVE7QUFDL0MsTUFBTXVDLDRCQUE0QnZDLFlBQVksdUJBQXVCO0FBQ3JFLE1BQU13QywwQkFBMEJ4QyxZQUFZLHFCQUFxQiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1hcHAvLi9hcHAvY29uc3RhbnRzL3JvdXRlcy50cz85ZmJmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfUk9VVEUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMXG5leHBvcnQgY29uc3QgS0FGS0FfUk9VVEUgPSAnL2FwaS9rYWZrYS9wcm9kdWNlJ1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX1RZUEVTX0VORFBPSU5UID0gQVBJX1JPVVRFICsgJy9kb2N1bWVudC10eXBlcydcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9DQVRFR09SSUVTX1JPVVRFID0gQVBJX1JPVVRFICsgJy9kb2N1bWVudC1jYXRlZ29yaWVzJ1xuZXhwb3J0IGNvbnN0IFVOQ0xBSU1FRF9FTlRJVFlfUk9VVEUgPSBBUElfUk9VVEUgKyAnL3VuY2xhaW1lZC1lbnRpdHknXG5leHBvcnQgY29uc3QgVkFMSURBVEVfU0FNX0VOVElUWV9ST1VURSA9XG4gIEFQSV9ST1VURSArICcvdmFsaWRhdGUtc2FtLXdpdGgtZW50aXR5LWRhdGEnXG5leHBvcnQgY29uc3QgRU5USVRJRVNfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2VudGl0aWVzJ1xuZXhwb3J0IGNvbnN0IEVOVElUWV9ST1VURSA9IEFQSV9ST1VURSArICcvZW50aXR5J1xuZXhwb3J0IGNvbnN0IEdFVF9OT1RJRklDQVRJT04gPSBBUElfUk9VVEUgKyAnL25vdGlmaWNhdGlvbnMnXG5leHBvcnQgY29uc3QgR0VUX0RPQ1VNRU5UUyA9IEFQSV9ST1VURSArICcvZG9jdW1lbnRzJ1xuZXhwb3J0IGNvbnN0IEdFVF9VU0VSX1BST0ZJTEUgPSBBUElfUk9VVEUgKyAnL3VzZXJzLydcbmV4cG9ydCBjb25zdCBRVUVTVElPTk5BSVJFX1JPVVRFID0gQVBJX1JPVVRFICsgJy9xdWVzdGlvbm5haXJlJ1xuZXhwb3J0IGNvbnN0IFdTX0xJVkVfTk9USUZJQ0FUSU9OUyA9XG4gIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1dTX0xJVkVfTk9USUZJQ0FUSU9OU1xuZXhwb3J0IGNvbnN0IElOQk9YX1JPVVRFID0gQVBJX1JPVVRFICsgJy9pbmJveCdcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9SRVFVSVJFRF9ST1VURSA9XG4gIEFQSV9ST1VURSArICcvZG9jdW1lbnQtcmVxdWlyZWQtcXVlc3Rpb25zJ1xuZXhwb3J0IGNvbnN0IEZJUk1fQVBQTElDQVRJT05TX1JPVVRFID0gQVBJX1JPVVRFICsgJy9hcHBsaWNhdGlvbidcbmV4cG9ydCBjb25zdCBGSVJNX0VWQUxVQVRJT05TX1JPVVRFID0gQVBJX1JPVVRFICsgJy9ldmFsdWF0aW9uJ1xuZXhwb3J0IGNvbnN0IE9LVEFfUE9TVF9MT0dJTl9ST1VURSA9IEFQSV9ST1VURSArICcvb2t0YS1wb3N0LWxvZ2luJ1xuZXhwb3J0IGNvbnN0IEFETUlOX0JBTk5FUl9ST1VURSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FETUlOX0ZFQVRVUkVfRU5BQkxFRFxuZXhwb3J0IGNvbnN0IENSRUFUSU5HX0FQUExJQ0FUSU9OX1JPVVRFID0gQVBJX1JPVVRFICsgJy9jcmVhdGluZy1wcm9ncmFtLWFwcGxpY2F0aW9uJ1xuZXhwb3J0IGNvbnN0IEVMSUdJQkxFX0FQUExZX1BST0dSQU1TX1JPVVRFID0gQVBJX1JPVVRFICsgJy9hcHBsaWNhdGlvbi1lbGlnaWJsZS10by1hcHBseS1wcm9ncmFtcydcbmV4cG9ydCBjb25zdCBVU0VSX1JPVVRFID0gQVBJX1JPVVRFICsgJy91c2VycydcbmV4cG9ydCBjb25zdCBJTlZJVEFUSU9OX1JPVVRFID0gQVBJX1JPVVRFICsgJy9pbnZpdGF0aW9uJ1xuZXhwb3J0IGNvbnN0IFVQREFURV9BUFBMSUNBVElPTl9TVEFURSA9IEFQSV9ST1VURSArICcvdXBkYXRlLWFwcGxpY2F0aW9uLXN0YXRlJ1xuZXhwb3J0IGNvbnN0IEFQUExJQ0FUSU9OX0NPTlRSSUJVVE9SX1JPVVRFID0gQVBJX1JPVVRFICsgJy9hcHBsaWNhdGlvbi1jb250cmlidXRvcnMnXG5leHBvcnQgY29uc3QgUVVFU1RJT05OQUlSRV9MSVNUX1JPVVRFID0gQVBJX1JPVVRFICsgJy9xdWVzdGlvbm5haXJlLWxpc3QnO1xuZXhwb3J0IGNvbnN0IEFOU1dFUl9ST1VURSA9IEFQSV9ST1VURSArICcvYW5zd2VyJ1xuXG5leHBvcnQgY29uc3QgQUNDRVBUX0lOVklUQVRJT05fUk9VVEUgPSBBUElfUk9VVEUgKyAnL2FjY2VwdC1pbnZpdGF0aW9uJ1xuZXhwb3J0IGNvbnN0IFVTRVJfUFJPRFVDVElWSVRZX1JPVVRFID1cbiAgQVBJX1JPVVRFICsgJy91c2VyLXByb2R1Y3Rpdml0eS1kYXNoYm9hcmQnXG5leHBvcnQgY29uc3QgRklSTV9FVkFMVUFUSU9OU19BRERfTk9URV9ST1VURSA9XG4gIEFQSV9ST1VURSArICcvdXBzZXJ0LXZpZXdmbG93LW5vdGUnXG5leHBvcnQgY29uc3QgRklSTV9FVkFMVUFUSU9OU19BU1NJR05fVVNFUl9ST1VURSA9IEFQSV9ST1VURSArICcvYXNzaWduLXVzZXItdG8tdmlld2Zsb3cnXG5leHBvcnQgY29uc3QgREVMRUdBVEVTX1JPVVRFID0gQVBJX1JPVVRFICsgJy9kZWxlZ2F0ZXMnXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fUk9VVEUgPSBBUElfUk9VVEUgKyAnL2FwcGxpY2F0aW9uJ1xuZXhwb3J0IGNvbnN0IFRFU1RFUl9MT0dJTl9ST1VURSA9IEFQSV9ST1VURSArICcvbG9naW4nXG5leHBvcnQgY29uc3QgVVNFUl9UQVNLX0RBU0hCT0FSRF9ST1VURSA9IEFQSV9ST1VURSArICcvdXNlci10YXNrLWRhc2hib2FyZCc7XG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fTk9URVNfUk9VVEUgPSBBUElfUk9VVEUgKyAnL2FwcGxpY2F0aW9uLW5vdGVzJztcbiJdLCJuYW1lcyI6WyJBUElfUk9VVEUiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsIktBRktBX1JPVVRFIiwiRE9DVU1FTlRfVFlQRVNfRU5EUE9JTlQiLCJET0NVTUVOVF9DQVRFR09SSUVTX1JPVVRFIiwiVU5DTEFJTUVEX0VOVElUWV9ST1VURSIsIlZBTElEQVRFX1NBTV9FTlRJVFlfUk9VVEUiLCJFTlRJVElFU19ST1VURSIsIkVOVElUWV9ST1VURSIsIkdFVF9OT1RJRklDQVRJT04iLCJHRVRfRE9DVU1FTlRTIiwiR0VUX1VTRVJfUFJPRklMRSIsIlFVRVNUSU9OTkFJUkVfUk9VVEUiLCJXU19MSVZFX05PVElGSUNBVElPTlMiLCJORVhUX1BVQkxJQ19XU19MSVZFX05PVElGSUNBVElPTlMiLCJJTkJPWF9ST1VURSIsIkRPQ1VNRU5UX1JFUVVJUkVEX1JPVVRFIiwiRklSTV9BUFBMSUNBVElPTlNfUk9VVEUiLCJGSVJNX0VWQUxVQVRJT05TX1JPVVRFIiwiT0tUQV9QT1NUX0xPR0lOX1JPVVRFIiwiQURNSU5fQkFOTkVSX1JPVVRFIiwiTkVYVF9QVUJMSUNfQURNSU5fRkVBVFVSRV9FTkFCTEVEIiwiQ1JFQVRJTkdfQVBQTElDQVRJT05fUk9VVEUiLCJFTElHSUJMRV9BUFBMWV9QUk9HUkFNU19ST1VURSIsIlVTRVJfUk9VVEUiLCJJTlZJVEFUSU9OX1JPVVRFIiwiVVBEQVRFX0FQUExJQ0FUSU9OX1NUQVRFIiwiQVBQTElDQVRJT05fQ09OVFJJQlVUT1JfUk9VVEUiLCJRVUVTVElPTk5BSVJFX0xJU1RfUk9VVEUiLCJBTlNXRVJfUk9VVEUiLCJBQ0NFUFRfSU5WSVRBVElPTl9ST1VURSIsIlVTRVJfUFJPRFVDVElWSVRZX1JPVVRFIiwiRklSTV9FVkFMVUFUSU9OU19BRERfTk9URV9ST1VURSIsIkZJUk1fRVZBTFVBVElPTlNfQVNTSUdOX1VTRVJfUk9VVEUiLCJERUxFR0FURVNfUk9VVEUiLCJBUFBMSUNBVElPTl9ST1VURSIsIlRFU1RFUl9MT0dJTl9ST1VURSIsIlVTRVJfVEFTS19EQVNIQk9BUkRfUk9VVEUiLCJBUFBMSUNBVElPTl9OT1RFU19ST1VURSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/constants/routes.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/auth.ts":
/*!*************************!*\
  !*** ./app/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig),\n/* harmony export */   getSessionServer: () => (/* binding */ getSessionServer)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/okta */ \"(rsc)/./node_modules/next-auth/providers/okta.js\");\n/* harmony import */ var _api_auth_utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/auth/utils/generateCsrfToken */ \"(rsc)/./app/api/auth/utils/generateCsrfToken.ts\");\n/* harmony import */ var _constants_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/routes */ \"(rsc)/./app/constants/routes.ts\");\n\n\n\n\n\nconst authConfig = {\n    providers: [\n        (0,next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.OKTA_OAUTH2_CLIENT_ID,\n            clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET,\n            issuer: process.env.OKTA_OAUTH2_ISSUER\n        })\n    ],\n    callbacks: {\n        jwt: async ({ token, account, profile })=>{\n            if (account && account.access_token) {\n                token.accessToken = account.access_token;\n            }\n            if (token.csrfToken !== null) {\n                token.csrfToken = (0,_api_auth_utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_2__.generateCsrfToken)();\n            }\n            if (profile && profile.sub) {\n                token.okta_id = profile.sub;\n            }\n            return token;\n        },\n        session: async ({ session, token })=>{\n            if (typeof token.accessToken === \"string\") {\n                session.user.accessToken = token.accessToken;\n            }\n            if (typeof token.csrfToken === \"string\") {\n                session.csrfToken = token.csrfToken;\n            }\n            // Add the Okta ID to the session\n            if (typeof token.okta_id === \"string\") {\n                session.user.okta_id = token.okta_id;\n            }\n            let userDetails = {\n                data: {}\n            };\n            const postData = {\n                user: {\n                    name: session.user.name,\n                    email: session.user.email,\n                    okta_id: token.okta_id\n                },\n                expires: session.expires,\n                csrfToken: session.csrfToken\n            };\n            try {\n                userDetails = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].post(_constants_routes__WEBPACK_IMPORTED_MODULE_3__.OKTA_POST_LOGIN_ROUTE, postData);\n                if (userDetails?.data?.permissions.length) {\n                    token.permissions = userDetails.data.permissions;\n                }\n                if (userDetails?.data?.user_id) {\n                    session.user.id = userDetails.data.user_id;\n                }\n                if (userDetails?.data?.okta_id && typeof userDetails.data.okta_id === \"string\") {\n                    session.user.okta_id = userDetails.data.okta_id;\n                }\n            } catch (error) {\n                console.error(\"Error making POST request:\", error);\n            }\n            const userSession = {\n                ...session,\n                ...userDetails.data || {}\n            };\n            // FOR TESTING to ensure we are not spreading an undefined object\n            // console.log('Final Session Object:');\n            // console.log(JSON.stringify(userSession, null, 2));\n            return userSession;\n        }\n    }\n};\nasync function getSessionServer() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authConfig);\n    return session;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eHRqcy1hcHAvLi9hcHAvbGliL2F1dGgudHM/NmJmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zLCBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBPa3RhUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9va3RhJztcbmltcG9ydCB7IGdlbmVyYXRlQ3NyZlRva2VuIH0gZnJvbSAnLi4vYXBpL2F1dGgvdXRpbHMvZ2VuZXJhdGVDc3JmVG9rZW4nO1xuaW1wb3J0IHsgT0tUQV9QT1NUX0xPR0lOX1JPVVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL3JvdXRlcyc7XG5pbXBvcnQgeyBJVXNlckRldGFpbHMgfSBmcm9tICcuL25leHQtYXV0aCc7XG5cbmV4cG9ydCBjb25zdCBhdXRoQ29uZmlnOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIE9rdGFQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuT0tUQV9PQVVUSDJfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuT0tUQV9PQVVUSDJfQ0xJRU5UX1NFQ1JFVCEsXG4gICAgICBpc3N1ZXI6IHByb2Nlc3MuZW52Lk9LVEFfT0FVVEgyX0lTU1VFUiEsXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGp3dDogYXN5bmMgKHsgdG9rZW4sIGFjY291bnQsIHByb2ZpbGUgfSkgPT4ge1xuICAgICAgaWYgKGFjY291bnQgJiYgYWNjb3VudC5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgdG9rZW4uYWNjZXNzVG9rZW4gPSBhY2NvdW50LmFjY2Vzc190b2tlbjtcbiAgICAgIH1cbiAgICAgIGlmICh0b2tlbi5jc3JmVG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgdG9rZW4uY3NyZlRva2VuID0gZ2VuZXJhdGVDc3JmVG9rZW4oKVxuICAgICAgfVxuICAgICAgaWYgKHByb2ZpbGUgJiYgcHJvZmlsZS5zdWIpIHtcbiAgICAgICAgdG9rZW4ub2t0YV9pZCA9IHByb2ZpbGUuc3ViO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBzZXNzaW9uOiBhc3luYyAoeyBzZXNzaW9uLCB0b2tlbiB9KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRva2VuLmFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBzZXNzaW9uLnVzZXIuYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NUb2tlbjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdG9rZW4uY3NyZlRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBzZXNzaW9uLmNzcmZUb2tlbiA9IHRva2VuLmNzcmZUb2tlbjtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCB0aGUgT2t0YSBJRCB0byB0aGUgc2Vzc2lvblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbi5va3RhX2lkID09PSAnc3RyaW5nJykge1xuICAgICAgICBzZXNzaW9uLnVzZXIub2t0YV9pZCA9IHRva2VuLm9rdGFfaWQ7XG4gICAgICB9XG5cbiAgICAgIGxldCB1c2VyRGV0YWlsczogeyBkYXRhOiBJVXNlckRldGFpbHMgfSA9IHsgZGF0YToge30gYXMgSVVzZXJEZXRhaWxzIH07XG4gICAgICBjb25zdCBwb3N0RGF0YSA9IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIG5hbWU6IHNlc3Npb24udXNlci5uYW1lLFxuICAgICAgICAgIGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwsXG4gICAgICAgICAgb2t0YV9pZDogdG9rZW4ub2t0YV9pZFxuICAgICAgICB9LFxuICAgICAgICBleHBpcmVzOiBzZXNzaW9uLmV4cGlyZXMsXG4gICAgICAgIGNzcmZUb2tlbjogc2Vzc2lvbi5jc3JmVG9rZW5cbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICB1c2VyRGV0YWlscyA9IGF3YWl0IGF4aW9zLnBvc3QoT0tUQV9QT1NUX0xPR0lOX1JPVVRFLCBwb3N0RGF0YSk7XG4gICAgICAgIGlmICh1c2VyRGV0YWlscz8uZGF0YT8ucGVybWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdG9rZW4ucGVybWlzc2lvbnMgPSB1c2VyRGV0YWlscy5kYXRhLnBlcm1pc3Npb25zO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VyRGV0YWlscz8uZGF0YT8udXNlcl9pZCkge1xuICAgICAgICAgIHNlc3Npb24udXNlci5pZCA9IHVzZXJEZXRhaWxzLmRhdGEudXNlcl9pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlckRldGFpbHM/LmRhdGE/Lm9rdGFfaWQgJiYgdHlwZW9mIHVzZXJEZXRhaWxzLmRhdGEub2t0YV9pZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBzZXNzaW9uLnVzZXIub2t0YV9pZCA9IHVzZXJEZXRhaWxzLmRhdGEub2t0YV9pZDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbWFraW5nIFBPU1QgcmVxdWVzdDonLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVzZXJTZXNzaW9uID0gey4uLnNlc3Npb24sIC4uLih1c2VyRGV0YWlscy5kYXRhIHx8IHt9KX07XG4gICAgICAvLyBGT1IgVEVTVElORyB0byBlbnN1cmUgd2UgYXJlIG5vdCBzcHJlYWRpbmcgYW4gdW5kZWZpbmVkIG9iamVjdFxuICAgICAgLy8gY29uc29sZS5sb2coJ0ZpbmFsIFNlc3Npb24gT2JqZWN0OicpO1xuICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlclNlc3Npb24sIG51bGwsIDIpKTtcblxuICAgICAgcmV0dXJuIHVzZXJTZXNzaW9uO1xuICAgIH0sXG5cbiAgfSxcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uU2VydmVyKCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoQ29uZmlnKVxuICByZXR1cm4gc2Vzc2lvbjtcbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsImdldFNlcnZlclNlc3Npb24iLCJPa3RhUHJvdmlkZXIiLCJnZW5lcmF0ZUNzcmZUb2tlbiIsIk9LVEFfUE9TVF9MT0dJTl9ST1VURSIsImF1dGhDb25maWciLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJPS1RBX09BVVRIMl9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJPS1RBX09BVVRIMl9DTElFTlRfU0VDUkVUIiwiaXNzdWVyIiwiT0tUQV9PQVVUSDJfSVNTVUVSIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJhY2NvdW50IiwicHJvZmlsZSIsImFjY2Vzc190b2tlbiIsImFjY2Vzc1Rva2VuIiwiY3NyZlRva2VuIiwic3ViIiwib2t0YV9pZCIsInNlc3Npb24iLCJ1c2VyIiwidXNlckRldGFpbHMiLCJkYXRhIiwicG9zdERhdGEiLCJuYW1lIiwiZW1haWwiLCJleHBpcmVzIiwicG9zdCIsInBlcm1pc3Npb25zIiwibGVuZ3RoIiwidXNlcl9pZCIsImlkIiwiZXJyb3IiLCJjb25zb2xlIiwidXNlclNlc3Npb24iLCJnZXRTZXNzaW9uU2VydmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/delayed-stream","vendor-chunks/has-flag","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();