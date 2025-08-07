export const getTokenFromResponse = (response: string) => {
    //  Bienvenido al sistema, el token: eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJuaWNvQGdtYWlsLmNvbSIsIm5hbWUiOiJuaWNvIiwiZXhwIjoxNzUzNzMxNTAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjYwIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2MCJ9.U0xS-SbMm5JLW9wNBYRvyXkcpMml_-bN7jwWmc1qGRM
    console.log('Response received:', response)
    const token = response.split('token: ')[1]
    if (!token || token.length < 2) {
        console.error('Token not found in response:', response)
        // throw new Error('Token not found in response')
        return null
    }
    console.log('Extracted token:', token)
    return token
}
