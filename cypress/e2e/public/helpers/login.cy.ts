
 
 /** LOGIN VALUEs */

 export const loginForm = {
   submit:'button[type="submit"]',
   username: 'input[aria-label="Username"]',
   password:'input[aria-label="Password"]',
 }
 
 export function goToLogin() {
   cy.visit('/login')
 }
 
 export function login(username?:string, password?:string, submit?:boolean) {
   username && cy.get(loginForm.username).clear().type(username);
   password && cy.get(loginForm.password).clear().type(password);
   submit && cy.get(loginForm.submit).click();
 }