export const createApplication = async (testId: number) => {
  return await fetch(`/application/create/${testId}`, {
    method: "POST"
  })
}

export const processApplication = async (testId: number) => {
  return await fetch(`/application/process/${testId}`, {
    method: "POST"
  })
}

export const rejectApplication = async (testId: number) => {
  return await fetch(`/application/reject/${testId}`, {
    method: "POST"
  })
}

export const getAllCreatedApplication = async () => {
  return await fetch('/application/created')
}

export const getAllApprovedApplication = async () => {
  return await fetch('/application/approved')
}