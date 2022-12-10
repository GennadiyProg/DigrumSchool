interface UserLoginData {
  UserName: string,
  Password: string,
}

export const register = async (body: UserLoginData) => {
 return await fetch('user/register', {
   headers: {'Content-type': 'application/json'},
   method: 'POST',
   body: JSON.stringify(body)
 })
}

export const login = async (body: UserLoginData) => {
  return await fetch('user/login', {
    headers: {'Content-type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(body)
  })
}