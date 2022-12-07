export type Reducer<State, Action> = (state: State, action: Action) => State

export type TextAction<ActionKind> = {
  type: ActionKind,
  payload: string
}

export interface Word {
  id?: string,
  title: string,
  translates: string[]
}

export interface Test {
  id: string,
  title: string,
  isGeneral: boolean,
  creator: string,
  words: Word[]
}