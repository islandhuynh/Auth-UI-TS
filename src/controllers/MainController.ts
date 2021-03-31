import { BaseController } from "./BaseController";


export class MainController extends BaseController {

  public createView(): HTMLDivElement {

    const title = this.createElement('h2', 'Welcome to our Main page!');

    const article = this.createElement('div', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    const button = this.createElement('button', 'Login', () => {
      this.router.switchToLoginView();
    });

    return this.container;
  }
}