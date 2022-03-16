describe("Error test", () => {
  const cookies = Cypress.env("cookies");
  const hostname = Cypress.env("hostname");
  //@ts-ignore
  Cypress.Commands.add("login", (cookies: Cypress.Cookie[]) => {
    for (let cookie of cookies) {
      cookie.sameSite = "lax";
      cy.setCookie(cookie.name, cookie.value, cookie);
    }
  });

  before(() => {
    cy.login(cookies);
    cy.visit(hostname);
  });
  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "appSession",
      "sub",
      "email",
      "userId",
      "bio",
      "darkMode",
      "role",
      "semesterId",
      "name"
    );
  });

  it("visit the wrong url", () => {
    //visit https://codepsace.ust.dev/test_error
    cy.request({ url: "/test_error", failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
    cy.visit("/test_error", {
      failOnStatusCode: false,
    });
    cy.get("#page-content .error-page-status-code");
  });
});
export {};
