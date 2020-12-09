describe('OrderHistory 컴포넌트 테스트', () => {
  before(() => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_TOKEN'));
    cy.visit('/user');
  });

  it('일반 사용자가 헤더 메뉴를 클릭하면 좌측에서 우측으로 사이드바 메뉴가 화면에 나타난다.', () => {
    cy.get("[data-testID='header-menu-toggle']").click();
    cy.get("[data-testID='header-menu']").should('exist');
  });

  it('일반 사용자가 사이드바메뉴에서 이용기록 조회를 클릭하면 오더조회 페이지로 이동한다.', () => {
    cy.get("[data-testID='history-button']").click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/orderHistory`);
    cy.clearCookie(Cypress.env('TOKEN_NAME'));
  });

  it('드라이버가 헤더 메뉴를 클릭하면 좌측에서 우측으로 사이드바 메뉴가 화면에 나타난다.', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('DRIVER_TOKEN'));
    cy.visit('/driver');
    cy.get("[data-testID='header-menu-toggle']").click();
    cy.get("[data-testID='header-menu']").should('exist');
  });

  it('드라이버가 사이드바메뉴에서 이용기록 조회를 클릭하면 오더조회 페이지로 이동한다.', () => {
    cy.get("[data-testID='history-button']").click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/orderHistory`);
  });
});

export default {};
