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

/***/ "(rsc)/./app/lib/auth.ts":
/*!*************************!*\
  !*** ./app/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig),\n/* harmony export */   getSessionServer: () => (/* binding */ getSessionServer)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/okta */ \"(rsc)/./node_modules/next-auth/providers/okta.js\");\n/* harmony import */ var _api_auth_utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/auth/utils/generateCsrfToken */ \"(rsc)/./app/api/auth/utils/generateCsrfToken.ts\");\n\n\n\n\nconst authConfig = {\n    providers: [\n        (0,next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.OKTA_OAUTH2_CLIENT_ID,\n            clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET,\n            issuer: process.env.OKTA_OAUTH2_ISSUER\n        })\n    ],\n    callbacks: {\n        jwt: async ({ token })=>{\n            if (token.csrfToken !== null) {\n                token.csrfToken = (0,_api_auth_utils_generateCsrfToken__WEBPACK_IMPORTED_MODULE_2__.generateCsrfToken)();\n            }\n            return token;\n        },\n        session: async ({ session, token })=>{\n            let userDetails = {\n                data: {}\n            };\n            if (typeof token.csrfToken === \"string\") {\n                session.csrfToken = token.csrfToken // CSRF token is now part of the token object and persisted through JWT.\n                ;\n            }\n            try {\n                userDetails = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(`https://ucms-internal-api.demo.sba-one.net/api/v1/okta-post-login`, {\n                    ...session\n                });\n            } catch (error) {\n                console.error(\"Error making POST request:\", error);\n            }\n            return {\n                ...session,\n                ...userDetails.data\n            };\n        }\n    }\n};\nasync function getSessionServer() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authConfig);\n    return session;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF5QjtBQUNvQztBQUNWO0FBQ29CO0FBRWhFLE1BQU1JLGFBQThCO0lBQ3pDQyxXQUFXO1FBQ1RILG9FQUFZQSxDQUFDO1lBQ1hJLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MscUJBQXFCO1lBQzNDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtZQUNuREMsUUFBUUwsUUFBUUMsR0FBRyxDQUFDSyxrQkFBa0I7UUFDeEM7S0FDRDtJQUNEQyxXQUFXO1FBQ1RDLEtBQUssT0FBTyxFQUFFQyxLQUFLLEVBQUU7WUFDbkIsSUFBSUEsTUFBTUMsU0FBUyxLQUFLLE1BQU07Z0JBQzVCRCxNQUFNQyxTQUFTLEdBQUdkLG9GQUFpQkE7WUFDckM7WUFDQSxPQUFPYTtRQUNUO1FBQ0FFLFNBQVMsT0FBTyxFQUFFQSxPQUFPLEVBQUVGLEtBQUssRUFBRTtZQUNoQyxJQUFJRyxjQUFjO2dCQUFDQyxNQUFNLENBQUM7WUFBQztZQUMzQixJQUFJLE9BQU9KLE1BQU1DLFNBQVMsS0FBSyxVQUFVO2dCQUN2Q0MsUUFBUUQsU0FBUyxHQUFHRCxNQUFNQyxTQUFTLENBQUMsd0VBQXdFOztZQUM5RztZQUNBLElBQUk7Z0JBQ0ZFLGNBQWMsTUFBTW5CLDZDQUFLQSxDQUFDcUIsSUFBSSxDQUFDLENBQUMsaUVBQWlFLENBQUMsRUFBRTtvQkFDakcsR0FBR0gsT0FBTztnQkFDYjtZQUVGLEVBQUUsT0FBT0ksT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLDhCQUE4QkE7WUFDOUM7WUFDQSxPQUFPO2dCQUFDLEdBQUdKLE9BQU87Z0JBQUUsR0FBR0MsWUFBWUMsSUFBSTtZQUFBO1FBQ3pDO0lBRUY7QUFDRixFQUFDO0FBQ00sZUFBZUk7SUFDcEIsTUFBTU4sVUFBVSxNQUFNakIsMkRBQWdCQSxDQUFDRztJQUN2QyxPQUFPYztBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWFwcC8uL2FwcC9saWIvYXV0aC50cz82YmZjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmltcG9ydCB7IE5leHRBdXRoT3B0aW9ucywgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCBPa3RhUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9va3RhJ1xuaW1wb3J0IHsgZ2VuZXJhdGVDc3JmVG9rZW4gfSBmcm9tICcuLi9hcGkvYXV0aC91dGlscy9nZW5lcmF0ZUNzcmZUb2tlbidcblxuZXhwb3J0IGNvbnN0IGF1dGhDb25maWc6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgT2t0YVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5PS1RBX09BVVRIMl9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5PS1RBX09BVVRIMl9DTElFTlRfU0VDUkVUISxcbiAgICAgIGlzc3VlcjogcHJvY2Vzcy5lbnYuT0tUQV9PQVVUSDJfSVNTVUVSISxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgand0OiBhc3luYyAoeyB0b2tlbiB9KSA9PiB7XG4gICAgICBpZiAodG9rZW4uY3NyZlRva2VuICE9PSBudWxsKSB7XG4gICAgICAgIHRva2VuLmNzcmZUb2tlbiA9IGdlbmVyYXRlQ3NyZlRva2VuKClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgc2Vzc2lvbjogYXN5bmMgKHsgc2Vzc2lvbiwgdG9rZW4gfSkgPT4ge1xuICAgICAgbGV0IHVzZXJEZXRhaWxzID0ge2RhdGE6IHt9fTtcbiAgICAgIGlmICh0eXBlb2YgdG9rZW4uY3NyZlRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBzZXNzaW9uLmNzcmZUb2tlbiA9IHRva2VuLmNzcmZUb2tlbiAvLyBDU1JGIHRva2VuIGlzIG5vdyBwYXJ0IG9mIHRoZSB0b2tlbiBvYmplY3QgYW5kIHBlcnNpc3RlZCB0aHJvdWdoIEpXVC5cbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHVzZXJEZXRhaWxzID0gYXdhaXQgYXhpb3MucG9zdChgaHR0cHM6Ly91Y21zLWludGVybmFsLWFwaS5kZW1vLnNiYS1vbmUubmV0L2FwaS92MS9va3RhLXBvc3QtbG9naW5gLCB7XG4gICAgICAgICAgIC4uLnNlc3Npb25cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbWFraW5nIFBPU1QgcmVxdWVzdDonLCBlcnJvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gey4uLnNlc3Npb24sIC4uLnVzZXJEZXRhaWxzLmRhdGF9XG4gICAgfSxcbiAgICBcbiAgfSxcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uU2VydmVyKCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoQ29uZmlnKVxuICByZXR1cm4gc2Vzc2lvbjtcbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsImdldFNlcnZlclNlc3Npb24iLCJPa3RhUHJvdmlkZXIiLCJnZW5lcmF0ZUNzcmZUb2tlbiIsImF1dGhDb25maWciLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJPS1RBX09BVVRIMl9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJPS1RBX09BVVRIMl9DTElFTlRfU0VDUkVUIiwiaXNzdWVyIiwiT0tUQV9PQVVUSDJfSVNTVUVSIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJjc3JmVG9rZW4iLCJzZXNzaW9uIiwidXNlckRldGFpbHMiLCJkYXRhIiwicG9zdCIsImVycm9yIiwiY29uc29sZSIsImdldFNlc3Npb25TZXJ2ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/delayed-stream","vendor-chunks/has-flag","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/preact","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CSANTHOSH%5CNadire%5Cmodule-federation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();