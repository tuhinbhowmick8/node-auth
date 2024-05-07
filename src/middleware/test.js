export const test = (req, res, next)=> {
    req.testName = "Saikat"
    console.log('Test Middleware')
    next()
}
