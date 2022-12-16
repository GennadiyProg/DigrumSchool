export const getUserByUsername = async (username: string) => {
  return await fetch(`/user/${username}`)
}