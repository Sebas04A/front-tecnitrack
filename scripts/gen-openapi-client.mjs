import { generate } from 'openapi-typescript-codegen'

const url = process.env.VITE_API_URL + '/swagger/v1/swagger.json'
if (!url) {
    console.error('Falta OPENAPI_URL o VITE_API_URL en el .env')
    process.exit(1)
}

const input =
    url.endsWith('/swagger.json') || url.endsWith('/openapi.json')
        ? url
        : `${url.replace(/\/$/, '')}/swagger/v1/swagger.json`

await generate({
    input,
    output: 'src/api',
    httpClient: 'axios',
    useOptions: true,
    exportCore: true,
    exportServices: true,
    exportModels: true,
})
console.log('✅ Cliente generado desde:', input)
