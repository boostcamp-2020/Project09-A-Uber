describe('SignIn 컴포넌트 테스트', () => {
  before(() => {
    cy.visit('/signup');
  });

  it('일반 사용자 회원가입 페이지에서 중복된 이메일로 가입을 시도하면 에러가 발생한다.', () => {
    cy.get("[data-testID='signup-name'] input").clear().type(Cypress.env('DUP_DRIVER_NAME'));
    cy.get("[data-testID='signup-email'] input").clear().type(Cypress.env('DUP_DRIVER_EMAIL'));
    cy.get("[data-testID='signup-password'] input")
      .clear()
      .type(Cypress.env('DUP_DRIVER_PASSWORD'));
    cy.get("[data-testID='signup-password-re'] input")
      .clear()
      .type(Cypress.env('DUP_DRIVER_PASSWORD'));
    cy.get("[data-testID='signup-phone'] input").clear().type(Cypress.env('DUP_DRIVER_PHONE'));
    cy.get("[data-testID='signup-next']").click();

    cy.get("[data-testID='signup-bank'] select").select(Cypress.env('BANK'));
    cy.get("[data-testID='signup-card1'] input").clear().type(Cypress.env('CARD_NUMBER'));
    cy.get("[data-testID='signup-card2'] input").clear().type(Cypress.env('CARD_NUMBER'));
    cy.get("[data-testID='signup-card3'] input").clear().type(Cypress.env('CARD_NUMBER'));
    cy.get("[data-testID='signup-card4'] input").clear().type(Cypress.env('CARD_NUMBER'));
    cy.get("[data-testID='signup-expiry-date'] input")
      .clear()
      .type(Cypress.env('CARD_EXPIRY_DATE'));
    cy.get("[data-testID='signup-cvc'] input").clear().type(Cypress.env('CARD_CVC'));

    cy.get("[data-testID='signup-user-submit']").click();

    cy.contains('duplicate key');
  });
});

export default {};
