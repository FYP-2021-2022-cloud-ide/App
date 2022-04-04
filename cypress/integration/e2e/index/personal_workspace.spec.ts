import {
  ContainerAddResponse,
  SandboxImageListResponse,
  SuccessStringResponse,
} from "../../../../src/lib/api/api";
import { c } from "../../../fixtures/constant";
import { recurse } from "cypress-recurse";
import { hostname } from "../../../support/commands";

describe("personal workspace test", () => {
  before(() => {
    cy.login();
    cy.visit(hostname);
    cy.visitPersonalWorkspace();
    cy.removeAllPersonalWorkspaces();
  });
  beforeEach(() => {
    cy.preserveCookies();
  });
  afterEach(() => {
    cy.removeAllPersonalWorkspaces();
  });

  it("create a personal workspace", () => {
    cy.createPersonalWorkspace();
  });

  it("cannot have same personal workspace name", () => {
    let name: string;
    cy.createPersonalWorkspace();
    cy.get("p#sandbox-name").then((el) => {
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
    cy.createPersonalWorkspace()
      .find("p#sandbox-name")
      .then((el) => {
        let name = el[0].innerText;
        cy.updatePersonalWorkspace(name, {
          name: "Personal workspace name (updated)",
          description: "Personal workspace description (udpated)",
        });
      });
  });

  // it("start a personal workspace", () => {
  //   let name: string;
  //   let card = cy
  //     .get(".sandbox-grid")
  //     .then((el) => {
  //       expect(el.children.length).greaterThan(1);
  //     })
  //     .children()
  //     .first();
  //   cy.intercept("/api/sandbox/addSandbox").as("start");
  //   card.should("exist");
  //   card.within(() => {
  //     cy.get(".sandbox-card-name").then((el) => {
  //       name = el[0].innerText;
  //     });
  //     cy.get("button").click();
  //     cy.get('div[role="menu"]').should("exist");
  //     cy.contains("button", "Start").click();
  //     cy.get('div[role="menu"]').should("not.exist");
  //   });
  //   cy.get(".toaster-loading").should("exist");
  //   cy.wait("@start", { responseTimeout: c.responseTimeout }).then(
  //     (interception) => {
  //       cy.get(".toaster-loading").should("not.exist");
  //       const response = interception.response.body as ContainerAddResponse;
  //       if (response.success) {
  //         cy.get(".toaster-success").should("exist");
  //         let card = cy
  //           .contains(".sandbox-card-name", name)
  //           .closest(".sandbox-card");
  //         card.should("exist");
  //         card.within(() => {
  //           cy.get("#indicator").should("have.class", "bg-green-400");
  //           cy.get("button").click();
  //           cy.contains("button", "Stop").should("exist");
  //         });
  //         cy.get("#container-list-grid").within(() => {
  //           cy.contains(name).should("exist");
  //         });
  //       } else {
  //         cy.get(".toaster-error").should("exist");
  //       }
  //     }
  //   );
  // });

  it("stop a personal workspace", () => {
    // get an active personal workspace in the container list
    // stop it in the sandbox grid
  });

  // it("starting more personal workspace than quota in a roll", ()=>{ })

  // it("change page when waiting for starting workspace", () => {

  // });

  //   it("create another personal workspace when waiting", () => {});

  // it("remove a personal workspace", () => {
  //   cy.intercept("/api/sandbox/removeSandboxImage").as("remove");
  //   cy.get(".sandbox-grid").within(() => {
  //     let name: string;
  //     let card = cy.get(".bg-gray-400").closest(".sandbox-card");
  //     card.find(".sandbox-card-name").then((el) => {
  //       name = el[0].innerText;
  //     });
  //     card.find("button").click();
  //     cy.contains("button", "Delete").click();
  //     cy.wait("@remove").then((interception) => {
  //       const response = interception.response.body as SuccessStringResponse;
  //       if (response.success) {
  //         cy.get(".toaster-success").should("exist");
  //         // the card should be removed
  //         cy.contains(".sandbox-card-name", name).should("not.exist");
  //       } else {
  //         cy.get(".toaster-error").should("exist");
  //       }
  //     });
  //   });
  // });

  // it("cannot remove a working workspace", () => {
  //   cy.get(".sandbox-grid").within(() => {
  //     cy.get(".bg-green-400").closest(".sandbox-card").find("button").click();
  //     cy.contains("button", "Delete").click();
  //     cy.get(".toaster-error").should("exist");
  //   });
  // });

  it("remove all personal workspaces", () => {});
});
export {};
