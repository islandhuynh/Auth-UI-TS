export class Router {

  public handleRequest() {
    console.log('Handling request for ' + this.getRoute());
  }

  private getRoute(): string {
    return window.location.pathname;
  }

}