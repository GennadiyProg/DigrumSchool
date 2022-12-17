interface CreateCourseBody {
  name: string,
  participants: string[],
  tests: number[],
}

export const createCourse = async (body: CreateCourseBody) => {
  return await fetch('/course/create', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
}