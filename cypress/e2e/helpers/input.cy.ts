

export function inputErrorContains(inputTag:string, errorMessage:string) {
 const errorTag =  '[aria-label="error"]';
 cy.get(inputTag).closest('div').siblings(errorTag).contains(errorMessage);
}