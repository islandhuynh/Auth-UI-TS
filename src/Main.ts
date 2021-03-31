import { Router } from "./Router";

export class Main {

  private router: Router = new Router();

  public constructor() {
    console.log('Constructed new Instance of the program');
  }

  public launchApp() {
    this.router.handleRequest();
  }
}

new Main().launchApp();