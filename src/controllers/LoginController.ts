import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";
import { LinkTextValue } from "./Decorators";

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
      this.errorLabelText = '';
      const result = await this.loginService.login(
        this.userNameInput.value,
        this.passwordInput.value
      );
      if (result) {

        this.router.switchToDashboardView(result);
      } else {
        this.errorLabelText = 'Wrong username or password';
      }

    } else {
      this.errorLabelText = 'Both fields must be filled out';
    }
  });

  private br3 = this.createElement('br');
  private errorLabel = this.createElement('label');

  @LinkTextValue('errorLabel')
  private errorLabelText: string = '';

  public createView(): HTMLDivElement {

    this.errorLabel.id = 'errorLabel';
    this.errorLabel.style.color = 'red';
    this.passwordInput.type = 'Password';

    return this.container;
  }
}