import {WordPrepare} from "../utils/types";
import {categories} from "../utils/consts";

interface CompletedTest {
  TestId: number,
  Score: number,
  CourseId?: number | string | null,
}
interface Test {
  Title: string,
  Category: string,
  Language: string,
  Words: WordPrepare[],
  IsGeneral: boolean,
}

export const testCreate = async (body: Test) => {
  return await fetch('/test/create', {
    headers: {'Content-type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export const getAllByUser = async (username: string = '') => {
  return await fetch(`/test/creator/${username}`)
}

export const getTestById = async (testId: string) => {
  return await fetch(`/test/${testId}`)
}

export const complete = async (body: CompletedTest) => {
  return await fetch('/test/complete', {
    headers: {'Content-type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export const getCompletedTests = async () => {
  return await fetch(`/test/completed`)
}

export const deleteTestById = async (id: number) => {
  return await fetch(`/test/${id}`, {
    headers: {'Content-type': 'application/json'},
    method: 'DELETE',
  })
}
export const getGlobalTestsByCategory = async (category: string) => {
  // Todo: Дописать апишку
  return await fetch('/')
}