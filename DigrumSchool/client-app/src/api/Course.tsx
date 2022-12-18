interface CreateCourseBody {
  groupName: string,
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

export const getCourseById = async (id: number) => {
  return await fetch(`/course/${id}`)
}

export const getUserCompletedTestsByCourse = async (courseId: number, userId?: number) => {
  return await fetch(`/course/completedtests/${courseId}/${userId || ''}`)
}

export const getLeaderboard = async (courseId: number) => {
  return await fetch(`/course/leaderboard/${courseId}`)
}

export const getCoursesByCreator = async (creatorUsername?: string) => {
  return await fetch(`/course/creator/${creatorUsername || ''}`)
}

export const getCoursesByParticipant = async (username?: string) => {
  return await fetch(`/course/participant/${username || ''}`)
}