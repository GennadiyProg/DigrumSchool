export type Reducer<State, Action> = (state: State, action: Action) => State

export type TextAction<ActionKind> = {
  type: ActionKind,
  payload: string
}

export interface WordPrepare {
  name: string,
  translations: string[]
}

export interface Word {
  id: number,
  name: string,
  translations: Translation[]
}

export interface Translation {
  id: number,
  value: string
}

export interface Test {
  id: number,
  title: string,
  isGeneral: boolean,
  creator: { username: string },
  language: { id: number, name: string },
  category: { id: number, name: string },
  words: Word[]
}

export interface User {
  id: number,
  courses: Course[],
  createdCourses: Course[],
  languages: Languages[],
  role: Role[],
  username: string,
}

export interface Course {
  id: number,
  creator: {username: string},
  participants: User[],
  tests: Test[],
  groupName: string,
}

export enum Languages {
  'English',
  'German',
  'Spanish',
}

export interface Role {
  id: number,
  name: RoleName
}

type RoleName = 'Teacher' | 'User' | 'Admin'

export interface CompletedTest {
  id: number,
  test: Test
  score: number,
  date: string,
  user: User,
}

export type AlertType = 'error' | 'warning' | 'info' | 'success'

export interface AppAlert {
  type: AlertType,
  message: string,
  isShow: boolean,
}