[![Publish Image](https://github.com/FYP-2021-2022-cloud-ide/App/actions/workflows/ci.yaml/badge.svg)](https://github.com/FYP-2021-2022-cloud-ide/App/actions/workflows/ci.yaml)

# Cnails frontend

![CleanShot 2022-02-18 at 04 35 10](https://user-images.githubusercontent.com/43137033/154566293-211ef2ab-e765-4182-9d1c-482ae9cc94a1.png)

# Main pages

1. Dashboard page
2. Instructor page
3. Student page
4. Message page
5. File Transfer page

# API

# Cypress

Cypress is responsible for the unit testing, integration testing and end-to-end testing. The source code of test is kept under the `cypress` folder with `cypress.json` as the configuration file in the project root.

Runnning all the test at once is time-consuming, most of the time tests are only ran when needed. Using this command `npx cypress run --spec <filepath>`.

Although unit testing's scope is bounded to the frontend, the end to end test has a much larger scope. Any problem that happens in the end to end could be caused by any part of the system (could be frontend or backend or something else). End to end test is most likely to be affected by many side effects, to avoid side effects, you might to "fake" certain components in the system. But I don't have time to do it, so the test progress is prioritized to "frontend-first". Side effects outside the frontend is ignored as much as possible.
