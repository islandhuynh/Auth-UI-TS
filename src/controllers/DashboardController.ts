import { SessionToken } from "../models/AuthenticationModels";
import { BaseController } from "./BaseController";


export class DashboardController extends BaseController {

  private sessionToken: SessionToken | undefined;

  public setSessionToken(sessionToken: SessionToken) {
    this.sessionToken = sessionToken;
  }

  public createView(): HTMLDivElement {
    const title = this.createElement('h2', 'Dashboard Controller');

    if (this.sessionToken) {
      this.createElement('label', `Welcome ${this.sessionToken.username}`)
    } else {
      this.createElement('label', 'Please go to the public parts of this app!');
    }

    return this.container;
  }
}