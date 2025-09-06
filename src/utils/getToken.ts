import { AutenticacionLoginResponse } from '../api'

export const getTokenFromResponse = (response: AutenticacionLoginResponse) => {
    //  Bienvenido al sistema, el token: eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJuaWNvQGdtYWlsLmNvbSIsIm5hbWUiOiJuaWNvIiwiZXhwIjoxNzUzNzMxNTAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjYwIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2MCJ9.U0xS-SbMm5JLW9wNBYRvyXkcpMml_-bN7jwWmc1qGRM
    const token = response.token
    console.log('Extracted token:', token)
    return token
}
