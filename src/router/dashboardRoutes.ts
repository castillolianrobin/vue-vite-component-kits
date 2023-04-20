import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'Home',
    label: 'Home',
    component: HomeView,
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/cards',
    name: 'Cards',
    label: 'Cards',
    component: () => import('../views/CardView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/buttons',
    name: 'Buttons',
    label: 'Buttons',
    component: () => import('../views/ButtonView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/dropdown',
    name: 'Dropdowns',
    label: 'Dropdowns',
    component: () => import('../views/DropdownView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/tabs',
    name: 'Tabs',
    label: 'Tabs',
    component: () => import('../views/TabView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/modal',
    name: 'Modals',
    label: 'Modals',
    component: () => import('../views/ModalView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/pagination',
    name: 'Pagination',
    label: 'Paginations',
    component: () => import('../views/PaginationView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/table',
    name: 'Table',
    label: 'Tables',
    component: () => import('../views/TableView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/form',
    name: 'Form',
    label: 'Form Validation',
    component: () => import('../views/FormView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/form/input',
    name: 'FormInput',
    label: 'Form Input & Text Area',
    component: () => import('../views/FormInputView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/form/select',
    name: 'FormSelect',
    label: 'Form Select',
    component: () => import('../views/FormSelectview.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/form/checkbox-radio',
    name: 'FormCheckboxRadio',
    label: 'Form Checkbox & Radio',
    component: () => import('../views/FormCheckboxRadioView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/form/file-upload',
    name: 'FormFileUpload',
    label: 'Form File Upload',
    component: () => import('../views/FormFileView.vue'),
    meta: { layout: 'Dashboard' },
  },
  {
    path: '/sanbox',
    name: 'Sandbox',
    label: 'Component Dump',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SandboxView.vue'),
    meta: { layout: 'Dashboard' },
  }
]