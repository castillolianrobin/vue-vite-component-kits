import type { RouterMiddleWare } from './index';


const test:RouterMiddleWare = (context) => {
  console.log('sample');
  return context.next();
} 

export default test;