import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";

export class LoginController extends BaseController {
  private loginService = new LoginService();

  private title = this.createElement('h2', 'Please Login');
  private userName = this.createElement('label', 'Username: ');
  private userNameInput = this.createElement('input');
  private br = this.createElement('br');
  private password = this.createElement('label', 'Password');
  private passwordInput = this.createElement('input');
  private br2 = this.createElement('br');

  private loginButton = this.createElement('button', 'Login', async () => {
    if (this.userNameInput.value && this.passwordInput.value) {
      this.resetErrorLabel();
      const result = await this.loginService.login(
        this.userNameInput.value,
        this.passwordInput.value
      );
      if (result) {

        this.router.switchToDashboardView(result);
      } else {
        this.showErrorLabel('Wrong username or password');
      }

    } else {
      this.showErrorLabel('Both fields must be filled out');
    }
  });

  private br3 = this.createElement('br');
  private errorLabel = this.createElement('label');

  private resetErrorLabel() {
    this.errorLabel.style.color = 'red';
    this.errorLabel.style.visibility = 'hidden';
  }

  private showErrorLabel(errorMessage: string) {
    this.errorLabel.innerText = errorMessage;
    this.errorLabel.style.visibility = 'visible';
  }

  public createView(): HTMLDivElement {

    this.passwordInput.type = 'Password';
    this.resetErrorLabel();

    return this.container;
  }
}