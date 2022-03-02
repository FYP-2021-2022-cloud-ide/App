/// <reference types="cypress" />

describe("dashboard test", () => {
    const cookies = Cypress.env("cookies")
    const hostname = Cypress.env("hostname")
    Cypress.Commands.add("login", (cookies) => {
        for (let cookie of cookies) {
            cy.setCookie(cookie.name, cookie.value, cookie)
        }
    })

    before(() => {
        cy.login(cookies)
        cy.visit(hostname)
    })
    beforeEach(() => {

    })
    it("list cookies", () => {
        const shouldHave = [
            "appSession",
            "sub",
            "email",
        ]
        cy.getCookies().then((cookies) => {
            // ensure that the cookies contains all should have
            cookies.map(c => c.name)
        })
    })

    it("login", () => {
        cy.wait(3000)
    })

    it("check topbar", () => {

    })

    it("check sidebar pages works normally", () => {

    })

    it("check tabs work normally", () => {

    })


})