export const paths = {
  LOGIN_ROUTE: '/login',
  REGISTRATION_ROUTE: '/registration',
  HOME_ROUTE: '/',
  COURSES_ROUTE: '/courses',
  TEST_ROUTE: '/test/:id',
  CREATE_TEST_ROUTE: '/create',
  MY_TESTS_ROUTE: '/my-tests',
  HISTORY_ROUTE: '/history',
}

// layouts
export const MAIN_LAYOUT = '/'
export const LOGIN_LAYOUT = '/'

export enum AuthStatus {
  none = 'none',
  success = 'success',
  error = 'error',
}