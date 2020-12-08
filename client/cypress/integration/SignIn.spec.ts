describe('SignIn 컴포넌트 테스트', () => {
  before(() => {
    cy.visit('/signin');
  });

  it('페이지 처음 로딩 시 토글 버튼의 기본 값은 일반 사용자이여야 한다.', () => {
    cy.get('.focus-toggle').should('have.text', '일반 사용자');
  });

  it('회원가입 버튼을 클릭하면 회원가입 페이지로 넘어가야 한다.', () => {
    cy.get('.signup-button').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });

  it('회원가입 페이지에서 헤더의 뒤로가기 버튼을 클릭 시 로그인 페이지로 이동해야 한다.', () => {
    cy.get("[data-testID='back-button']").click();
    cy.get("[data-testID='login-button']").click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  });

  it('로그인 정보가 일치하지 않을 경우 toast 메세지가 나타난다.', () => {
    cy.get("input[type='text'").type(Cypress.env('INVALID_USER_EMAIL'));
    cy.get("input[type='password'").type(Cypress.env('INVALID_USER_PASSWORD'));
    cy.get("[data-testID='login-button']").click();

    cy.get('.am-toast').should('exist');
  });

  it('올바른 일반 사용자 이메일, 패스워드 입력 시 유저 메인 페이지로 이동한다.', () => {
    cy.get("input[type='text']").clear().type(Cypress.env('USER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('USER_PASSWORD'));
    cy.get("[data-testID='login-button']").click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/user`);
  });

  it('올바른 드라이버 사용자 이메일 패스워드 입력 시 드라이버 메인 페이지로 이동한다.', () => {
    cy.visit('/signin');
    cy.get("input[type='text']").clear().type(Cypress.env('DRIVER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('DRIVER_PASSWORD'));
    cy.contains('드라이버').click();
    cy.get("[data-testID='login-button']").click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/driver`);
  });

  it('회원가입 안된 유저로 로그인 시 로그인 실패 toast 메세지가 나타난다.', () => {
    cy.visit('/signin');
    cy.get("input[type='text']").clear().type(Cypress.env('INVALID_USER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('INVALID_USER_PASSWORD'));
    cy.get("[data-testID='login-button']").click();

    cy.contains('이메일이 유효하지 않습니다.');
  });

  it('일반 사용자로 드라이버 로그인을 시도할 경우 toast 메시지가 나타난다.', () => {
    cy.visit('/signin');
    cy.get("input[type='text']").clear().type(Cypress.env('USER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('USER_PASSWORD'));
    cy.contains('드라이버').click();
    cy.get("[data-testID='login-button']").click();

    cy.get('.am-toast').should('exist');
  });

  it('드라이버 계정으로 일반 사용자 로그인을 시도할 경우 toast 메시지가 나타난다.', () => {
    cy.visit('/signin');
    cy.get("input[type='text']").clear().type(Cypress.env('DRIVER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('DRIVER_PASSWORD'));
    cy.get("[data-testID='login-button']").click();

    cy.get('.am-toast').should('exist');
  });

  it('잘못된 비밀번호를 입력 시 toast 메시지가 나타난다.', () => {
    cy.visit('/signin');
    cy.get("input[type='text']").clear().type(Cypress.env('USER_EMAIL'));
    cy.get("input[type='password']").clear().type(Cypress.env('INVALID_USER_PASSWORD'));
    cy.get("[data-testID='login-button']").click();

    cy.contains('비밀번호가 일치하지 않습니다.');
  });

  it('회원가입 버튼 클릭 시 회원가입 페이지로 이동한다.', () => {
    cy.visit('/signin');
    cy.contains('회원가입').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });
});

export default {};
