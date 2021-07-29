/* eslint-disable no-undef */

function addWalls(walls) {
  walls.forEach((wall) => {
    cy.get(`#${wall}`).click();
  });
}

const visitedNodeAnimBtn =
  "[data-test=Visited-Animations-btn] > .chakra-switch__track";

const visualizeBtn = "[data-test=visualize-btn]";
const routeAnimBtn =
  "[data-test=Route-Animations-btn] > .chakra-switch__track > .chakra-switch__thumb";

const resetBtn = ".css-1dydu7t > :nth-child(1)";
const clearWallsBtn = ".css-1dydu7t > :nth-child(2)";
const clearPathBtn = ".css-1dydu7t > :nth-child(3)";

describe("testing grid functionalities", () => {
  it("create wall and remove wall", () => {
    cy.visit("/");
    cy.get("#11-2").click();
    cy.get("#11-2").should("have.class", "wall");

    cy.get("#11-2").click();
    cy.get("#11-2").should("not.have.class", "wall");
  });

  it("remove all walls", () => {
    cy.visit("/");
    addWalls([
      "11-2",
      "10-11",
      "4-10",
      "10-4",
      "14-14",
      "10-35",
      "11-34",
      "2-20",
    ]);

    cy.get(clearWallsBtn).click();

    cy.get(".grid__node").should("not.have.class", "wall");
  });
  it("reset grid", () => {
    cy.visit("/");
    addWalls(["11-2", "10-11", "4-10"]);
    cy.get(visualizeBtn).click();

    cy.wait(10000);
    cy.get(resetBtn).click();

    cy.get(".grid__node").should("not.have.class", "wall");
    cy.get(".grid__node").should("not.have.class", "visitedNode-animation");
    cy.get(".grid__node").should("not.have.class", "route-animation");
  });

  it("clear path", () => {
    cy.visit("/");

    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get(clearPathBtn).click({});
    cy.get(".grid__node").should("not.have.class", "visitedNode-animation");
    cy.get(".grid__node").should("not.have.class", "visitedNode");
  });

  it("find route - [WITH ROUTE-ANIMATION]", () => {
    cy.visit("/");

    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get("#10-20").should("have.class", "route-animation");
    cy.get("#10-20").should("not.have.class", "route");
  });

  it("find route - [WITHOUT ROUTE-ANIMATION]", () => {
    cy.visit("/");

    cy.get(routeAnimBtn).click();
    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get("#10-20").should("not.have.class", "route-animation");
    cy.get("#10-20").should("have.class", "route");
  });

  it("find route  from startNode to endNode", () => {
    cy.visit("/");

    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get("#2-10").should("have.class", "route-animation");
    cy.get("#10-20").should("have.class", "route-animation");
  });

  it("No Route to endNode was found", () => {
    cy.visit("/");

    addWalls(["1-9", "2-9", "3-9", "3-10", "3-11", "2-11", "1-11", "1-10"]);
    cy.get(visualizeBtn).click();
    cy.wait(16000);

    cy.get("#2-10").should("not.have.class", "route-animation");
    cy.get("#10-20").should("not.have.class", "route-animation");
  });

  it("find route - [WITH VisitedNode-ANIMATION]", () => {
    cy.visit("/");

    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get("#14-16").should("have.class", "visitedNode-animation");
    cy.get("#14-15").should("not.have.class", "visitedNode");
  });

  it("find route - [WITHOUT VisitedNode-ANIMATION]", () => {
    cy.visit("/");
    cy.get(visitedNodeAnimBtn).click();
    cy.get(visualizeBtn).click();
    cy.wait(10000);

    cy.get("#14-15").should("have.class", "visitedNode");
    cy.get("#14-16").should("not.have.class", "visitedNode-animation");
  });

  it("open and close drawer", () => {
    cy.visit("/");

    cy.viewport("ipad-2");
    const openDrawerBtn = ".css-1p7ebew > .chakra-icon > path";
    const closeDrawerBtn = ".chakra-modal__close-btn > .chakra-icon > path";
    const websiteName =
      "#chakra-modal-2 > .css-f1rwq6 > :nth-child(1) > :nth-child(1) > .chakra-heading";
    cy.get(openDrawerBtn).click();

    cy.get(websiteName).should("be.visible");

    cy.get(closeDrawerBtn).click();

    cy.get(openDrawerBtn).should("be.visible");
  });

  it("test fail deploy", () => {
    const websiteName =
      "#chakra-modal-2 > .css-f1rwq6 > :nth-child(1) > :nth-child(1) > .chakra-heading";
    cy.get(websiteName).should("eq", "hello");
  });
  // it("move ending node", () => {
  //   cy.visit("/");
  //   // cy.get("[data-cy='2-3']").click();
  //   cy.get("#2-10")
  //     .trigger("mousedown")
  //     .wait(10000)
  //     .trigger("mouseenter", { clientX: 340, clientY: 499 })
  //     .wait(10000);
  //   // cy.get("#7-18 > div", { timeout: 20000 }).should("have.class", "star");
  // });
});
