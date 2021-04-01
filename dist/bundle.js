/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Router.ts":
/*!***********************!*\
  !*** ./src/Router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/DashboardController */ "./src/controllers/DashboardController.ts");
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/LoginController */ "./src/controllers/LoginController.ts");
/* harmony import */ var _controllers_MainController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/MainController */ "./src/controllers/MainController.ts");



class Router {
    constructor() {
        this.mainElement = document.getElementById('main-container');
    }
    handleRequest() {
        console.log('Handling request for ' + this.getRoute());
        switch (this.getRoute()) {
            case '/login':
                this.switchToLoginView();
                break;
            case '/dashboard':
                this.switchToDashboardView(undefined);
                break;
            default:
                if (this.mainElement) {
                    const mainController = new _controllers_MainController__WEBPACK_IMPORTED_MODULE_2__.MainController(this);
                    this.mainElement.append(mainController.createView());
                }
                break;
        }
    }
    switchToDashboardView(sessionToken) {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const dashboardController = new _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__.DashboardController(this);
            if (sessionToken) {
                dashboardController.setSessionToken(sessionToken);
            }
            this.mainElement.append(dashboardController.createView());
        }
    }
    switchToLoginView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const loginController = new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__.LoginController(this);
            this.mainElement.append(loginController.createView());
        }
    }
    getRoute() {
        return window.location.pathname;
    }
}


/***/ }),

/***/ "./src/controllers/BaseController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/BaseController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseController": () => (/* binding */ BaseController)
/* harmony export */ });
class BaseController {
    constructor(router) {
        this.container = document.createElement('div');
        this.router = router;
    }
    createElement(elementType, innerText, action) {
        const element = document.createElement(elementType);
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }
    ;
    insertBreak() {
        this.createElement('br');
    }
}


/***/ }),

/***/ "./src/controllers/DashboardController.ts":
/*!************************************************!*\
  !*** ./src/controllers/DashboardController.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardController": () => (/* binding */ DashboardController)
/* harmony export */ });
/* harmony import */ var _models_AuthenticationModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/AuthenticationModels */ "./src/models/AuthenticationModels.ts");
/* harmony import */ var _services_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/DataService */ "./src/services/DataService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class DashboardController extends _BaseController__WEBPACK_IMPORTED_MODULE_2__.BaseController {
    constructor() {
        super(...arguments);
        this.dataService = new _services_DataService__WEBPACK_IMPORTED_MODULE_1__.DataService();
    }
    setSessionToken(sessionToken) {
        this.sessionToken = sessionToken;
    }
    createView() {
        const title = this.createElement('h2', 'Dashboard Controller');
        if (this.sessionToken) {
            this.createElement('label', `Welcome ${this.sessionToken.username}`);
            this.insertBreak();
            this.generateButtons();
        }
        else {
            this.createElement('label', 'Please go to the public parts of this app!');
        }
        return this.container;
    }
    generateButtons() {
        var _a;
        if (this.sessionToken) {
            for (const access of this.sessionToken.accessRights) {
                this.createElement('button', _models_AuthenticationModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight[access], () => __awaiter(this, void 0, void 0, function* () {
                    yield this.triggerAction(access);
                }));
            }
        }
        if ((_a = this.sessionToken) === null || _a === void 0 ? void 0 : _a.accessRights.includes(_models_AuthenticationModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ)) {
            this.insertBreak();
            this.createElement('label', 'search: ');
            this.searchArea = this.createElement('input');
            this.searchResultArea = this.createElement('div');
        }
    }
    triggerAction(access) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`button ${access} was clicked`);
            switch (access) {
                case _models_AuthenticationModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ:
                    const users = yield this.dataService.getUsers(this.sessionToken.tokenId, this.searchArea.value);
                    for (const user of users) {
                        const label = this.createElement('label', JSON.stringify(user));
                        label.onclick = () => {
                            label.classList.toggle('selectedLabel');
                            this.selectedUser = user;
                            this.selectedLabel = label;
                        };
                        this.searchResultArea.append(document.createElement('br'));
                    }
                    break;
                case _models_AuthenticationModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.DELETE:
                    if (this.selectedUser) {
                        this.dataService.deleteUser(this.sessionToken.tokenId, this.selectedUser);
                        this.selectedLabel.innerHTML = '';
                    }
                    break;
                default:
                    break;
            }
        });
    }
}


/***/ }),

/***/ "./src/controllers/LoginController.ts":
/*!********************************************!*\
  !*** ./src/controllers/LoginController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginController": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _services_LoginService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/LoginService */ "./src/services/LoginService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class LoginController extends _BaseController__WEBPACK_IMPORTED_MODULE_1__.BaseController {
    constructor() {
        super(...arguments);
        this.loginService = new _services_LoginService__WEBPACK_IMPORTED_MODULE_0__.LoginService();
        this.title = this.createElement('h2', 'Please Login');
        this.userName = this.createElement('label', 'Username: ');
        this.userNameInput = this.createElement('input');
        this.br = this.createElement('br');
        this.password = this.createElement('label', 'Password');
        this.passwordInput = this.createElement('input');
        this.br2 = this.createElement('br');
        this.loginButton = this.createElement('button', 'Login', () => __awaiter(this, void 0, void 0, function* () {
            if (this.userNameInput.value && this.passwordInput.value) {
                this.resetErrorLabel();
                const result = yield this.loginService.login(this.userNameInput.value, this.passwordInput.value);
                if (result) {
                    this.router.switchToDashboardView(result);
                }
                else {
                    this.showErrorLabel('Wrong username or password');
                }
            }
            else {
                this.showErrorLabel('Both fields must be filled out');
            }
        }));
        this.br3 = this.createElement('br');
        this.errorLabel = this.createElement('label');
    }
    resetErrorLabel() {
        this.errorLabel.style.color = 'red';
        this.errorLabel.style.visibility = 'hidden';
    }
    showErrorLabel(errorMessage) {
        this.errorLabel.innerText = errorMessage;
        this.errorLabel.style.visibility = 'visible';
    }
    createView() {
        this.passwordInput.type = 'Password';
        this.resetErrorLabel();
        return this.container;
    }
}


/***/ }),

/***/ "./src/controllers/MainController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/MainController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainController": () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");

class MainController extends _BaseController__WEBPACK_IMPORTED_MODULE_0__.BaseController {
    createView() {
        const title = this.createElement('h2', 'Welcome to our Main page!');
        const article = this.createElement('div', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        const button = this.createElement('button', 'Login', () => {
            this.router.switchToLoginView();
        });
        return this.container;
    }
}


/***/ }),

/***/ "./src/models/AuthenticationModels.ts":
/*!********************************************!*\
  !*** ./src/models/AuthenticationModels.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessRight": () => (/* binding */ AccessRight)
/* harmony export */ });
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight || (AccessRight = {}));


/***/ }),

/***/ "./src/services/DataService.ts":
/*!*************************************!*\
  !*** ./src/services/DataService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:8000/';
const usersUrl = baseUrl + 'users';
class DataService {
    getUsers(authorization, nameQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = usersUrl + '?name=' + nameQuery;
            const options = {
                method: 'GET',
                headers: {
                    Authorization: authorization
                }
            };
            const result = yield fetch(url, options);
            const resultJson = yield result.json();
            return resultJson;
        });
    }
    deleteUser(authorization, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = usersUrl + '?id=' + user.id;
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: authorization
                }
            };
            yield fetch(url, options);
        });
    }
}


/***/ }),

/***/ "./src/services/LoginService.ts":
/*!**************************************!*\
  !*** ./src/services/LoginService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginService": () => (/* binding */ LoginService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:8000/';
const loginUrl = baseUrl + 'login';
class LoginService {
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            };
            const result = yield fetch(loginUrl, options);
            if (result.status === 201) {
                return yield result.json();
            }
            else {
                return undefined;
            }
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "./src/Router.ts");

class Main {
    constructor() {
        this.router = new _Router__WEBPACK_IMPORTED_MODULE_0__.Router();
        console.log('Constructed new Instance of the program');
    }
    launchApp() {
        this.router.handleRequest();
    }
}
new Main().launchApp();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvUm91dGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9CYXNlQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvY29udHJvbGxlcnMvRGFzaGJvYXJkQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvY29udHJvbGxlcnMvTG9naW5Db250cm9sbGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9NYWluQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvbW9kZWxzL0F1dGhlbnRpY2F0aW9uTW9kZWxzLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9zZXJ2aWNlcy9EYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvc2VydmljZXMvTG9naW5TZXJ2aWNlLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9NYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ1I7QUFDRjtBQUd2RCxNQUFNLE1BQU07SUFBbkI7UUFFVSxnQkFBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQTJDbEUsQ0FBQztJQXpDUSxhQUFhO1FBQ2xCLE9BQU8sQ0FBQyxHQUFH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SSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXNoYm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlcnMvRGFzaGJvYXJkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9Mb2dpbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBTZXNzaW9uVG9rZW4gfSBmcm9tIFwiLi9tb2RlbHMvQXV0aGVudGljYXRpb25Nb2RlbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xyXG5cclxuICBwcml2YXRlIG1haW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGFpbmVyJyk7XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVSZXF1ZXN0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ0hhbmRsaW5nIHJlcXVlc3QgZm9yICcgKyB0aGlzLmdldFJvdXRlKCkpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5nZXRSb3V0ZSgpKSB7XHJcbiAgICAgIGNhc2UgJy9sb2dpbic6XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hUb0xvZ2luVmlldygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICcvZGFzaGJvYXJkJzpcclxuICAgICAgICB0aGlzLnN3aXRjaFRvRGFzaGJvYXJkVmlldyh1bmRlZmluZWQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmICh0aGlzLm1haW5FbGVtZW50KSB7XHJcbiAgICAgICAgICBjb25zdCBtYWluQ29udHJvbGxlcjogTWFpbkNvbnRyb2xsZXIgPSBuZXcgTWFpbkNvbnRyb2xsZXIodGhpcyk7XHJcbiAgICAgICAgICB0aGlzLm1haW5FbGVtZW50LmFwcGVuZChtYWluQ29udHJvbGxlci5jcmVhdGVWaWV3KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzd2l0Y2hUb0Rhc2hib2FyZFZpZXcoc2Vzc2lvblRva2VuOiBTZXNzaW9uVG9rZW4gfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0aGlzLm1haW5FbGVtZW50KSB7XHJcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZENvbnRyb2xsZXI6IERhc2hib2FyZENvbnRyb2xsZXIgPSBuZXcgRGFzaGJvYXJkQ29udHJvbGxlcih0aGlzKTtcclxuICAgICAgaWYgKHNlc3Npb25Ub2tlbikge1xyXG4gICAgICAgIGRhc2hib2FyZENvbnRyb2xsZXIuc2V0U2Vzc2lvblRva2VuKHNlc3Npb25Ub2tlbik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tYWluRWxlbWVudC5hcHBlbmQoZGFzaGJvYXJkQ29udHJvbGxlci5jcmVhdGVWaWV3KCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN3aXRjaFRvTG9naW5WaWV3KCkge1xyXG4gICAgaWYgKHRoaXMubWFpbkVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5tYWluRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgY29uc3QgbG9naW5Db250cm9sbGVyOiBMb2dpbkNvbnRyb2xsZXIgPSBuZXcgTG9naW5Db250cm9sbGVyKHRoaXMpO1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50LmFwcGVuZChsb2dpbkNvbnRyb2xsZXIuY3JlYXRlVmlldygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Um91dGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uL1JvdXRlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlVmlldygpOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZUVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4oXHJcbiAgICBlbGVtZW50VHlwZTogSywgaW5uZXJUZXh0Pzogc3RyaW5nLCBhY3Rpb24/OiBhbnlcclxuICApOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG4gICAgaWYgKGlubmVyVGV4dCkge1xyXG4gICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGlubmVyVGV4dDtcclxuICAgIH1cclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgZWxlbWVudC5vbmNsaWNrID0gYWN0aW9uO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfTtcclxuXHJcbiAgcHJvdGVjdGVkIGluc2VydEJyZWFrKCkge1xyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50KCdicicpO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBY2Nlc3NSaWdodCwgU2Vzc2lvblRva2VuIH0gZnJvbSBcIi4uL21vZGVscy9BdXRoZW50aWNhdGlvbk1vZGVsc1wiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9EYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL0RhdGFTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sbGVyIH0gZnJvbSBcIi4vQmFzZUNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IFNlc3Npb25Ub2tlbiB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIHNlYXJjaEFyZWE6IEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRBcmVhOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSA9IG5ldyBEYXRhU2VydmljZSgpO1xyXG5cclxuICBwcml2YXRlIHNlbGVjdGVkVXNlcjogVXNlciB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIHNlbGVjdGVkTGFiZWw6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICBwdWJsaWMgc2V0U2Vzc2lvblRva2VuKHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuKSB7XHJcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHNlc3Npb25Ub2tlbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVWaWV3KCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdEYXNoYm9hcmQgQ29udHJvbGxlcicpO1xyXG5cclxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xyXG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgYFdlbGNvbWUgJHt0aGlzLnNlc3Npb25Ub2tlbi51c2VybmFtZX1gKTtcclxuICAgICAgdGhpcy5pbnNlcnRCcmVhaygpO1xyXG4gICAgICB0aGlzLmdlbmVyYXRlQnV0dG9ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdQbGVhc2UgZ28gdG8gdGhlIHB1YmxpYyBwYXJ0cyBvZiB0aGlzIGFwcCEnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdlbmVyYXRlQnV0dG9ucygpIHtcclxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xyXG4gICAgICBmb3IgKGNvbnN0IGFjY2VzcyBvZiB0aGlzLnNlc3Npb25Ub2tlbi5hY2Nlc3NSaWdodHMpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIEFjY2Vzc1JpZ2h0W2FjY2Vzc10sIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMudHJpZ2dlckFjdGlvbihhY2Nlc3MpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbj8uYWNjZXNzUmlnaHRzLmluY2x1ZGVzKEFjY2Vzc1JpZ2h0LlJFQUQpKSB7XHJcbiAgICAgIHRoaXMuaW5zZXJ0QnJlYWsoKTtcclxuICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdzZWFyY2g6ICcpO1xyXG4gICAgICB0aGlzLnNlYXJjaEFyZWEgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIHRoaXMuc2VhcmNoUmVzdWx0QXJlYSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHRyaWdnZXJBY3Rpb24oYWNjZXNzOiBBY2Nlc3NSaWdodCkge1xyXG4gICAgY29uc29sZS5sb2coYGJ1dHRvbiAke2FjY2Vzc30gd2FzIGNsaWNrZWRgKTtcclxuICAgIHN3aXRjaCAoYWNjZXNzKSB7XHJcbiAgICAgIGNhc2UgQWNjZXNzUmlnaHQuUkVBRDpcclxuICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHRoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcnMoXHJcbiAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiEudG9rZW5JZCxcclxuICAgICAgICAgIHRoaXMuc2VhcmNoQXJlYSEudmFsdWVcclxuICAgICAgICApXHJcbiAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgICAgICBsYWJlbC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZExhYmVsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdEFyZWEhLmFwcGVuZChcclxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBY2Nlc3NSaWdodC5ERUxFVEU6XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRVc2VyKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVVzZXIoXHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuIS50b2tlbklkLFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlclxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsIS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL0xvZ2luU2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgbG9naW5TZXJ2aWNlID0gbmV3IExvZ2luU2VydmljZSgpO1xyXG5cclxuICBwcml2YXRlIHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdQbGVhc2UgTG9naW4nKTtcclxuICBwcml2YXRlIHVzZXJOYW1lID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdVc2VybmFtZTogJyk7XHJcbiAgcHJpdmF0ZSB1c2VyTmFtZUlucHV0ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaXZhdGUgYnIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCAnUGFzc3dvcmQnKTtcclxuICBwcml2YXRlIHBhc3N3b3JkSW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgcHJpdmF0ZSBicjIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XHJcblxyXG4gIHByaXZhdGUgbG9naW5CdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdMb2dpbicsIGFzeW5jICgpID0+IHtcclxuICAgIGlmICh0aGlzLnVzZXJOYW1lSW5wdXQudmFsdWUgJiYgdGhpcy5wYXNzd29yZElucHV0LnZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVzZXRFcnJvckxhYmVsKCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9naW5TZXJ2aWNlLmxvZ2luKFxyXG4gICAgICAgIHRoaXMudXNlck5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgICB0aGlzLnBhc3N3b3JkSW5wdXQudmFsdWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5zd2l0Y2hUb0Rhc2hib2FyZFZpZXcocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvckxhYmVsKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RXJyb3JMYWJlbCgnQm90aCBmaWVsZHMgbXVzdCBiZSBmaWxsZWQgb3V0Jyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHByaXZhdGUgYnIzID0gdGhpcy5jcmVhdGVFbGVtZW50KCdicicpO1xyXG4gIHByaXZhdGUgZXJyb3JMYWJlbCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuXHJcbiAgcHJpdmF0ZSByZXNldEVycm9yTGFiZWwoKSB7XHJcbiAgICB0aGlzLmVycm9yTGFiZWwuc3R5bGUuY29sb3IgPSAncmVkJztcclxuICAgIHRoaXMuZXJyb3JMYWJlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dFcnJvckxhYmVsKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVycm9yTGFiZWwuaW5uZXJUZXh0ID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgdGhpcy5lcnJvckxhYmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlVmlldygpOiBIVE1MRGl2RWxlbWVudCB7XHJcblxyXG4gICAgdGhpcy5wYXNzd29yZElucHV0LnR5cGUgPSAnUGFzc3dvcmQnO1xyXG4gICAgdGhpcy5yZXNldEVycm9yTGFiZWwoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CYXNlQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZVZpZXcoKTogSFRNTERpdkVsZW1lbnQge1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdXZWxjb21lIHRvIG91ciBNYWluIHBhZ2UhJyk7XHJcblxyXG4gICAgY29uc3QgYXJ0aWNsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2JywgJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdMb2dpbicsICgpID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIuc3dpdGNoVG9Mb2dpblZpZXcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcclxuICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25Ub2tlbiB7XHJcbiAgdG9rZW5JZDogc3RyaW5nLFxyXG4gIHVzZXJuYW1lOiBzdHJpbmcsXHJcbiAgdmFsaWQ6IGJvb2xlYW4sXHJcbiAgZXhwaXJhdGlvblRpbWU6IERhdGUsXHJcbiAgYWNjZXNzUmlnaHRzOiBBY2Nlc3NSaWdodFtdXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEFjY2Vzc1JpZ2h0IHtcclxuICBDUkVBVEUsXHJcbiAgUkVBRCxcclxuICBVUERBVEUsXHJcbiAgREVMRVRFXHJcbn0iLCJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9EYXRhTW9kZWxzXCI7XHJcblxyXG5jb25zdCBiYXNlVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8nO1xyXG5jb25zdCB1c2Vyc1VybCA9IGJhc2VVcmwgKyAndXNlcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgcHVibGljIGFzeW5jIGdldFVzZXJzKGF1dGhvcml6YXRpb246IHN0cmluZywgbmFtZVF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPFVzZXJbXT4ge1xyXG4gICAgY29uc3QgdXJsID0gdXNlcnNVcmwgKyAnP25hbWU9JyArIG5hbWVRdWVyeTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBBdXRob3JpemF0aW9uOiBhdXRob3JpemF0aW9uXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCByZXN1bHRKc29uID0gYXdhaXQgcmVzdWx0Lmpzb24oKTtcclxuICAgIHJldHVybiByZXN1bHRKc29uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZVVzZXIoYXV0aG9yaXphdGlvbjogc3RyaW5nLCB1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1cmwgPSB1c2Vyc1VybCArICc/aWQ9JyArIHVzZXIuaWQ7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IFNlc3Npb25Ub2tlbiB9IGZyb20gXCIuLi9tb2RlbHMvQXV0aGVudGljYXRpb25Nb2RlbHNcIjtcclxuXHJcbmNvbnN0IGJhc2VVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbmNvbnN0IGxvZ2luVXJsID0gYmFzZVVybCArICdsb2dpbic7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5TZXJ2aWNlIHtcclxuICBwdWJsaWMgYXN5bmMgbG9naW4odXNlck5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8U2Vzc2lvblRva2VuIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICB1c2VybmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2gobG9naW5VcmwsIG9wdGlvbnMpO1xyXG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IDIwMSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluIHtcclxuXHJcbiAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0NvbnN0cnVjdGVkIG5ldyBJbnN0YW5jZSBvZiB0aGUgcHJvZ3JhbScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxhdW5jaEFwcCgpIHtcclxuICAgIHRoaXMucm91dGVyLmhhbmRsZVJlcXVlc3QoKTtcclxuICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKCkubGF1bmNoQXBwKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==