
 
 /** LOGIN VALUEs */

 export const loginForm = {
   submit:'button[type="submit"]',
   username: 'input[aria-label="Email"]',
   password:'input[aria-label="Password"]',
   error: '[aria-label="form-error"]',
 }
 
 export function goToLogin() {
   cy.visit('/login')
 }
 
 export function login(username?:string, password?:string, submit?:boolean) {
   username && cy.get(loginForm.username).clear().type(username);
   password && cy.get(loginForm.password).clear().type(password);
   submit && cy.get(loginForm.submit).click();
 }