# Vue 3 Component Kits 

<div>
    <img alt="Vue" src="https://img.shields.io/badge/-Vue-3EAF7C?style=flat-square&logo=Vue.js&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Tailwind" src="https://img.shields.io/badge/-Tailwind-0EA5E9?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/-Vite-8869F2?style=flat-square&logo=vite&logoColor=white" /> 
    <img alt="Jest" src="https://img.shields.io/badge/-Vitest-6da13f?style=flat-square&logo=Vitest&logoColor=white" />
    <img alt="Cypress" src="https://img.shields.io/badge/-Cypress-007780?style=flat-square&logo=cypress&logoColor=white" />
</div>

<br>

<div>
    <img 
        src="https://raw.githubusercontent.com/castillolianrobin/vue-vite-component-kits/main/public/home_sample.png"
        style="border-radius: 12px; margin: auto; display: block;" 
    />
</div>



<br> 

A set of vue components utilizing Tailwind CSS with the intention to improve the acceleration of development by providing reusable components similar to Vuetify but with the flexibility of Tailwind.

The components are customizable and themeable, specially in colors. All the components uses custom colors declared in the tailwind config (primary, secondary, info, alert, error, success). The components itself are also flexible via props which would lessen the need to customize the component codebase.


<br>

>### [<img width="20" src="https://www.netlify.com/v3/img/components/logomark-dark.png" alt="Netlify logo"> Component List ](https://component-kits-vue3.netlify.app/)
>### [<img width="20" src="https://www.netlify.com/v3/img/components/logomark-dark.png" alt="Netlify logo"> Demo ](https://component-kits-vue3.netlify.app/login)
>### [<img width="20" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo"> React Version ](https://github.com/castillolianrobin/react-vite-component-kits/)

<br>

## Extras 
- [HeroIcon](https://heroicons.com/)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)


<br> <br> 



# Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
