describe('로그아웃 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  it('일반 사용자 로그아웃 성공', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('USER_MAIN'));
    cy.reload();

    cy.get("[data-testID='header-menu-toggle']").click();
    cy.get("[data-testID='header-menu']").should('exist');

    cy.get("[data-testID='logout-button']").click();
    cy.contains('확인버튼 클릭시 로그아웃 됩니다.');
    cy.get('.am-modal-button:contains("확인")').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  });

  it('드라이버 로그아웃 성공', () => {
    cy.setCookie(Cypress.env('TOKEN_NAME'), Cypress.env('DRIVER_MAIN'));
    cy.visit('/');

    cy.get("[data-testID='header-menu-toggle']").click();
    cy.get("[data-testID='header-menu']").should('exist');

    cy.get("[data-testID='logout-button']").click();
    cy.contains('확인버튼 클릭시 로그아웃 됩니다.');
    cy.get('.am-modal-button:contains("확인")').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  });
});

export default {};
