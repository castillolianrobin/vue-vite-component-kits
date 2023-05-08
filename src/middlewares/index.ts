import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';


// export { default as authentication } from './authentication';



/** __MIDDLEWARE LOGIC__ */

/** Run all middlewares */
export function executeMiddlewares(context: MiddlewareContext) {
  const { to } = context;
  
  const middlewares = extractMiddleware(to)
  
  return middlewares[0]({ 
      ...context, 
      next: handleNext(context, middlewares, 1) 
  });
}

function extractMiddleware(to: RouteLocationNormalized) {
  const matchedMiddleware: RouterMiddleWare[] = []
  for (const route of to.matched) {
    if (route.meta.middleware)
      if (Array.isArray(route.meta.middleware)) {
        matchedMiddleware.push(
          ...route.meta.middleware as RouterMiddleWare[]
        )
      } else {
        matchedMiddleware.push(
          route.meta.middleware as RouterMiddleWare
        )
      }
  }
  return matchedMiddleware;
}


/**
 * Recursive function that handles 
 * the next function of the middleware
 */
const handleNext:NextHandler = function (context, middlewares, index) {
  const nextMiddleware = middlewares[index];
  
  // Returns default router next()_if no nextMiddleware;
  if (!nextMiddleware) return context.next;
  
  // Return a new next handle that runs the nextMiddle
  // And handle the subsequent possible middleware 
  return () => nextMiddleware({
    ...context,
    next: handleNext(context, middlewares, index + 1)
  }) 
}



/** __TYPE DEFINITIONS__ */

export interface RouterMiddleWare {
  (context: MiddlewareContext): NavigationGuardNext | void;
}

export interface NextHandler {
  (
    context: MiddlewareContext, 
    middlewares: RouterMiddleWare[], 
    index: number
  ): NavigationGuardNext;
}

export interface MiddlewareContext  {
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  router: Router;
  to: RouteLocationNormalized;
}