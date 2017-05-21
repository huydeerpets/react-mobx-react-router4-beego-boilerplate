const isProduction = process.env.NODE_ENV === 'production'
const API_URL = isProduction ? 'http://localhost:8080' : 'http://localhost:3000'

export { isProduction, API_URL }
