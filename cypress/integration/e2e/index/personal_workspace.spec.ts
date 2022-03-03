import {
  SandboxAddResponse,
  SandboxImageListResponse,
  SuccessStringResponse,
} from "../../../../src/lib/api/api";
import { c } from "../../../fixtures/constant";
import { recurse } from "cypress-recurse";
import { createGunzip } from "zlib";

describe("personal workspace test", () => {
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
    cy.intercept("/api/sandbox/listSandboxImage?userId=**").as("listSandbox");
    cy.visit(hostname);
    // click the personal workspace tab
    cy.get("#page-content")
      .find("button")
      .contains("Personal Workspaces")
      .click();
    cy.wait("@listSandbox").then((interception) => {
      const response = interception.response.body as SandboxImageListResponse;
      expect(response.success).equal(true);
    });
  });

  it("create a personal workspace", () => {
    let workspaceNumber: number;
    let personalWorkspaceName: string;
    let personalWorkspaceDescription: string;
    cy.get(".sandbox-grid").then((el) => {
      workspaceNumber = el.children.length - 1;
    });
    cy.get(".sandbox-grid").children().last().click();
    // wait for the modal to show up
    cy.wait(1000).then(() => {
      cy.get(".modal-form").within(() => {
        cy.get("#name")
          .find("input")
          .then((el) => {
            // the initial value should never be the empty
            expect(el[0].value).not.equal("");
            personalWorkspaceName = el[0].value;
          });
        cy.get("#description")
          .find("textarea")
          .then((el) => {
            // the description should be empty
            expect(el[0].value).equal("");
          })
          .type("this is a test description")
          .then((el) => {
            expect(el[0].value).equal("this is a test description");
          });
      });

      cy.intercept("/api/sandbox/addSandboxImage").as("create");
      cy.get(".modal-form").contains("button", "OK").click();
      // should have a loading toast
      cy.get(".toaster-loading").should("exist");
      // the modal should close
      cy.get(".modal-form").should("not.exist");
      cy.wait("@create", { responseTimeout: c.responseTimeout }).then(
        (interception) => {
          const response = interception.response.body as SandboxAddResponse;
          // the loading toast should disappear
          cy.get(".toaster-loading").should("not.exist");
          cy.wait(1000).then(() => {
            // if response is success
            if (response.success) {
              cy.get(".toaster-success").should("exist");
              cy.get(".sandbox-grid").then((el) => {
                expect(el.children.length).equal(workspaceNumber + 1);
              });
            } else {
              cy.get(".toaster-error").should("exist");
              cy.get(".sandbox-grid").then((el) => {
                expect(el.children.length).equal(workspaceNumber);
              });
            }
          });
        }
      );
    });
  });

  it("cannot have same personal workspace name", () => {
    let name: string;
    cy.get(".sandbox-grid").children().last().click();
    cy.wait(1000).then(() => {
      cy.intercept("/api/sandbox/addSandboxImage").as("create");
      cy.get(".modal-form").contains("button", "OK").click();
      cy.wait("@create", { responseTimeout: c.responseTimeout }).then(
        (interception) => {
          const response = interception.response.body as SandboxAddResponse;
          expect(response.success).equal(true);
        }
      );
    });
    cy.get(".sandbox-card-name").then((el) => {
      name = el[0].innerText;
      expect(name).not.equal("");
    });
    cy.get(".sandbox-grid").children().last().click();
    cy.wait(1000).then(() => {
      cy.get(".modal-form").within(() => {
        cy.get("input").clear().type(name);
        // the red text should show up
        cy.get("p").contains("Name crash").should("exist");
        // OK button is diabled
        cy.contains("button", "OK").should("be.disabled");
        cy.contains("button", "Cancel").click();
      });
    });
    cy.get(".modal-form").should("not.exist");
  });

  it("update a personal workspace", () => {
    let name: string;
    let description: string;
    let card = cy
      .get(".sandbox-grid")
      .then((el) => {
        expect(el.children.length).greaterThan(1);
      })
      .children()
      .first();
    card.within(() => {
      cy.get(".sandbox-card-name").then((el) => {
        name = el[0].innerText;
      });
      cy.get(".sandbox-card-des").then((el) => {
        description = el[0].innerText;
      });
      cy.get("button").click();
      // the menu should show up
      cy.get('div[role="menu"]').should("exist");
      cy.contains("button", "Update").click();
      cy.get('div[role="menu"]').should("not.exist");
    });
    cy.wait(1000).then(() => {
      // the update menu should show up
      cy.get(".modal-form").within(() => {
        cy.get("input").then((el) => {
          expect(el[0].value).equal(name);
        });
        cy.get("textarea").then((el) => {
          expect(el[0].value).equal(description);
        });

        cy.get("input")
          .clear()
          .type(name + "(test)");
        cy.get("textarea")
          .clear()
          .type(description + "(test)");
        cy.intercept("/api/sandbox/updateSandboxImage").as("update");
        cy.contains("button", "OK").click();
      });
      // the modal form should close
      cy.get(".modal-form").should("not.exist");
      cy.wait("@update", { responseTimeout: c.responseTimeout }).then(
        (interception) => {
          const response = interception.response.body as SuccessStringResponse;
          if (response.success) {
            cy.get(".toaster-success").should("exist");
            cy.contains(".sandbox-card-name", name + "(test)").should("exist");
            cy.contains(".sandbox-card-des", description + "(test)").should(
              "exist"
            );
          } else {
            cy.get(".toaster-error").should("exist");
          }
        }
      );
    });
  });

  //   it("change page when waiting for starting workspace", () => {});

  //   it("create another personal workspace when waiting", () => {});

  //   it("remove a personal workspace", () => {});

  //   it("remove cannot remove a working workspace", () => {});

  it("remove all personal workspaces", () => {
    recurse(
      () => {
        // remove a personal workspace
        let count: number;
        cy.get(".sandbox-grid")
          .children()
          .then((children) => {
            count = children.length;
          });
        const card = cy.get(".sandbox-grid").children().first();
        card.within(() => {
          cy.get("button").click();
          // the menu should show up
          cy.get('div[role="menu"]').should("exist");
          cy.intercept("/api/sandbox/removeSandboxImage").as("remove");
          cy.contains("button", "Delete").click();
          cy.get('div[role="menu"]').should("not.exist");
        });
        //   cy.get(".toaster-loading").should("exist");
        cy.wait("@remove", { responseTimeout: c.responseTimeout }).then(
          (interception) => {
            const response = interception.response
              .body as SuccessStringResponse;
            //   cy.get(".toaster-loading").should("not.exist");
            if (response.success) {
              cy.get(".toaster-success").should("exist").click();
              cy.wait(1000);
              cy.get(".sandbox-grid")
                .children()
                .then((children) => {
                  expect(children.length).equal(count - 1);
                });
            } else {
              cy.get(".toaster-error").should("exist").click();
            }
          }
        );
        return cy.get(".sandbox-grid").children();
      },
      (children) => children.length === 1,
      {
        log: true,
        limit: 999,
        timeout: 60 * 60 * 1000,
        delay: 300,
      }
    );
  });
});
export {};
