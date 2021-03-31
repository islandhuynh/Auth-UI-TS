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
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");

class DashboardController extends _BaseController__WEBPACK_IMPORTED_MODULE_0__.BaseController {
    setSessionToken(sessionToken) {
        this.sessionToken = sessionToken;
    }
    createView() {
        const title = this.createElement('h2', 'Dashboard Controller');
        if (this.sessionToken) {
            this.createElement('label', `Welcome ${this.sessionToken.username}`);
        }
        else {
            this.createElement('label', 'Please go to the public parts of this app!');
        }
        return this.container;
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
class LoginService {
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userName === 'user' && password === '123') {
                return {
                    username: 'Some user'
                };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvUm91dGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9CYXNlQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvY29udHJvbGxlcnMvRGFzaGJvYXJkQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvY29udHJvbGxlcnMvTG9naW5Db250cm9sbGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9NYWluQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvc2VydmljZXMvTG9naW5TZXJ2aWNlLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hbmFnZXJ1aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9NYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ1I7QUFDRjtBQUd2RCxNQUFNLE1BQU07SUFBbkI7UUFFVSxnQkFBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQTJDbEUsQ0FBQztJQXpDUSxhQUFhO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFdkQsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkIsS0FBSyxRQUFRO2dCQUNYLElBQUks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QUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkTSxNQUFNLFlBQVk7SUFDVixLQUFLLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjs7WUFDbkQsSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQzdDLE9BQU87b0JBQ0wsUUFBUSxFQUFFLFdBQVc7aUJBQ2Y7YUFDVDtpQkFBTTtnQkFDTCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtRQUNILENBQUM7S0FBQTtDQUNGOzs7Ozs7O1VDYkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFFM0IsTUFBTSxJQUFJO0lBSWY7UUFGUSxXQUFNLEdBQVcsSUFBSSwyQ0FBTSxFQUFFLENBQUM7UUFHcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhc2hib2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9EYXNoYm9hcmRDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IExvZ2luQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL0xvZ2luQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFNlc3Npb25Ub2tlbiB9IGZyb20gXCIuL21vZGVscy9BdXRoZW50aWNhdGlvbk1vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XHJcblxyXG4gIHByaXZhdGUgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1jb250YWluZXInKTtcclxuXHJcbiAgcHVibGljIGhhbmRsZVJlcXVlc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnSGFuZGxpbmcgcmVxdWVzdCBmb3IgJyArIHRoaXMuZ2V0Um91dGUoKSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmdldFJvdXRlKCkpIHtcclxuICAgICAgY2FzZSAnL2xvZ2luJzpcclxuICAgICAgICB0aGlzLnN3aXRjaFRvTG9naW5WaWV3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJy9kYXNoYm9hcmQnOlxyXG4gICAgICAgIHRoaXMuc3dpdGNoVG9EYXNoYm9hcmRWaWV3KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgaWYgKHRoaXMubWFpbkVsZW1lbnQpIHtcclxuICAgICAgICAgIGNvbnN0IG1haW5Db250cm9sbGVyOiBNYWluQ29udHJvbGxlciA9IG5ldyBNYWluQ29udHJvbGxlcih0aGlzKTtcclxuICAgICAgICAgIHRoaXMubWFpbkVsZW1lbnQuYXBwZW5kKG1haW5Db250cm9sbGVyLmNyZWF0ZVZpZXcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN3aXRjaFRvRGFzaGJvYXJkVmlldyhzZXNzaW9uVG9rZW46IFNlc3Npb25Ub2tlbiB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMubWFpbkVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5tYWluRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgY29uc3QgZGFzaGJvYXJkQ29udHJvbGxlcjogRGFzaGJvYXJkQ29udHJvbGxlciA9IG5ldyBEYXNoYm9hcmRDb250cm9sbGVyKHRoaXMpO1xyXG4gICAgICBpZiAoc2Vzc2lvblRva2VuKSB7XHJcbiAgICAgICAgZGFzaGJvYXJkQ29udHJvbGxlci5zZXRTZXNzaW9uVG9rZW4oc2Vzc2lvblRva2VuKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1haW5FbGVtZW50LmFwcGVuZChkYXNoYm9hcmRDb250cm9sbGVyLmNyZWF0ZVZpZXcoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3dpdGNoVG9Mb2dpblZpZXcoKSB7XHJcbiAgICBpZiAodGhpcy5tYWluRWxlbWVudCkge1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICBjb25zdCBsb2dpbkNvbnRyb2xsZXI6IExvZ2luQ29udHJvbGxlciA9IG5ldyBMb2dpbkNvbnRyb2xsZXIodGhpcyk7XHJcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQuYXBwZW5kKGxvZ2luQ29udHJvbGxlci5jcmVhdGVWaWV3KCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSb3V0ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi4vUm91dGVyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuICBwcm90ZWN0ZWQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVWaWV3KCk6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlRWxlbWVudDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPihcclxuICAgIGVsZW1lbnRUeXBlOiBLLCBpbm5lclRleHQ/OiBzdHJpbmcsIGFjdGlvbj86IGFueVxyXG4gICk6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBpZiAoaW5uZXJUZXh0KSB7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gaW5uZXJUZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBlbGVtZW50Lm9uY2xpY2sgPSBhY3Rpb247XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9O1xyXG5cclxufSIsImltcG9ydCB7IFNlc3Npb25Ub2tlbiB9IGZyb20gXCIuLi9tb2RlbHMvQXV0aGVudGljYXRpb25Nb2RlbHNcIjtcclxuaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CYXNlQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuICBwcml2YXRlIHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuIHwgdW5kZWZpbmVkO1xyXG5cclxuICBwdWJsaWMgc2V0U2Vzc2lvblRva2VuKHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuKSB7XHJcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHNlc3Npb25Ub2tlbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVWaWV3KCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdEYXNoYm9hcmQgQ29udHJvbGxlcicpO1xyXG5cclxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xyXG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgYFdlbGNvbWUgJHt0aGlzLnNlc3Npb25Ub2tlbi51c2VybmFtZX1gKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdQbGVhc2UgZ28gdG8gdGhlIHB1YmxpYyBwYXJ0cyBvZiB0aGlzIGFwcCEnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL0xvZ2luU2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgbG9naW5TZXJ2aWNlID0gbmV3IExvZ2luU2VydmljZSgpO1xyXG5cclxuICBwcml2YXRlIHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdQbGVhc2UgTG9naW4nKTtcclxuICBwcml2YXRlIHVzZXJOYW1lID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdVc2VybmFtZTogJyk7XHJcbiAgcHJpdmF0ZSB1c2VyTmFtZUlucHV0ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaXZhdGUgYnIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCAnUGFzc3dvcmQnKTtcclxuICBwcml2YXRlIHBhc3N3b3JkSW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgcHJpdmF0ZSBicjIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XHJcblxyXG4gIHByaXZhdGUgbG9naW5CdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdMb2dpbicsIGFzeW5jICgpID0+IHtcclxuICAgIGlmICh0aGlzLnVzZXJOYW1lSW5wdXQudmFsdWUgJiYgdGhpcy5wYXNzd29yZElucHV0LnZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVzZXRFcnJvckxhYmVsKCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9naW5TZXJ2aWNlLmxvZ2luKFxyXG4gICAgICAgIHRoaXMudXNlck5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgICB0aGlzLnBhc3N3b3JkSW5wdXQudmFsdWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5zd2l0Y2hUb0Rhc2hib2FyZFZpZXcocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvckxhYmVsKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RXJyb3JMYWJlbCgnQm90aCBmaWVsZHMgbXVzdCBiZSBmaWxsZWQgb3V0Jyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHByaXZhdGUgYnIzID0gdGhpcy5jcmVhdGVFbGVtZW50KCdicicpO1xyXG4gIHByaXZhdGUgZXJyb3JMYWJlbCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuXHJcbiAgcHJpdmF0ZSByZXNldEVycm9yTGFiZWwoKSB7XHJcbiAgICB0aGlzLmVycm9yTGFiZWwuc3R5bGUuY29sb3IgPSAncmVkJztcclxuICAgIHRoaXMuZXJyb3JMYWJlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dFcnJvckxhYmVsKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVycm9yTGFiZWwuaW5uZXJUZXh0ID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgdGhpcy5lcnJvckxhYmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlVmlldygpOiBIVE1MRGl2RWxlbWVudCB7XHJcblxyXG4gICAgdGhpcy5wYXNzd29yZElucHV0LnR5cGUgPSAnUGFzc3dvcmQnO1xyXG4gICAgdGhpcy5yZXNldEVycm9yTGFiZWwoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CYXNlQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZVZpZXcoKTogSFRNTERpdkVsZW1lbnQge1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdXZWxjb21lIHRvIG91ciBNYWluIHBhZ2UhJyk7XHJcblxyXG4gICAgY29uc3QgYXJ0aWNsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2JywgJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdMb2dpbicsICgpID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIuc3dpdGNoVG9Mb2dpblZpZXcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBTZXNzaW9uVG9rZW4gfSBmcm9tIFwiLi4vbW9kZWxzL0F1dGhlbnRpY2F0aW9uTW9kZWxzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XHJcbiAgcHVibGljIGFzeW5jIGxvZ2luKHVzZXJOYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFNlc3Npb25Ub2tlbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgaWYgKHVzZXJOYW1lID09PSAndXNlcicgJiYgcGFzc3dvcmQgPT09ICcxMjMnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICdTb21lIHVzZXInXHJcbiAgICAgIH0gYXMgYW55XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4vUm91dGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbiB7XHJcblxyXG4gIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdDb25zdHJ1Y3RlZCBuZXcgSW5zdGFuY2Ugb2YgdGhlIHByb2dyYW0nKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsYXVuY2hBcHAoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5oYW5kbGVSZXF1ZXN0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5uZXcgTWFpbigpLmxhdW5jaEFwcCgpOyJdLCJzb3VyY2VSb290IjoiIn0=