describe('유저와 오더 상태에 따른 라우팅 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('오더가 없는 유저일 경우 유저 메인 페이지(user)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_MAIN'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user`);
  });

  it('유저의 오더 상태가 waiting일 경우 드라이버 매칭을 기다리는 화면(searchDriver)으로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_WAITING'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/searchDriver`);
  });

  it('유저의 오더 상태가 approval일 경우 드라이버를 기다리는 페이지(waitingDriver)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_APPROVAL'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/waitingDriver`);
  });

  it('유저의 오더 상태가 startedDrive일 경우 도착지로 이동하는 페이지(goToDestination)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_STARTED_DRIVE'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/goToDestination`);
  });

  it('오더가 없는 드라이버일 경우 드라이버 메인 페이지(driver)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('DRIVER_MAIN'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/driver`);
  });

  it('드라이버의 오더 상태가 approval일 경우 출발지로 이동하는 페이지(goToOrigin)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('DRIVER_APPROVAL'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/driver/goToOrigin`);
  });

  it('드라이버의 오더 상태가 startedDrive일 경우 도착지로 이동하는 페이지(goToDestination)로 이동한다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('DRIVER_STARTED_DRIVE'));
    cy.reload();
    cy.url().should('eq', `${Cypress.config().baseUrl}/driver/goToDestination`);
  });
});

export default {};
