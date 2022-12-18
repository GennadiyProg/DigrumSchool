export const paths = {
  LOGIN_ROUTE: '/login',
  REGISTRATION_ROUTE: '/registration',
  HOME_ROUTE: '/',
  COURSES_ROUTE: '/courses',
  TEST_ROUTE: '/test/:id',
  CREATE_TEST_ROUTE: '/create',
  MY_TESTS_ROUTE: '/my-tests',
  HISTORY_ROUTE: '/history',
  CREATE_COURSE_ROUTE: '/create-course',
  COURSE_ROUTE: '/course/:id',
}

// layouts
export const MAIN_LAYOUT = '/'
export const LOGIN_LAYOUT = '/'

export enum AuthStatus {
  none = 'none',
  success = 'success',
  error = 'error',
}

export const categories = [
  'Тело человека',
  'Животные',
  'Семья',
  'Еда',
  'Чувства',
  'Цвета',
  'Время',
  'Инструменты',
  'Размеры',
  'Дом',
  'Кухня',
  'Здоровье',
  'Город',
  'География',
  'Океан',
  'Природа',
  'Погода',
  'Птицы',
  'Насекомые',
  'Цветы',
  'Транспорт',
  'Образование',
  'Космос',
  'Другое',
  'Мои уроки',
]

export const languages = [
  'English',
  'German',
  'French',
  'Spanish',
  'Italian',
]