export type Reducer<State, Action> = (state: State, action: Action) => State

export type TextAction<ActionKind> = {
  type: ActionKind,
  payload: string
}