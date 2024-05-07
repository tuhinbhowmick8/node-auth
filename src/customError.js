class CustomError extends Error {
    constructor(message, statusCode) {
       super(message);
       this.status = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    }
}
export default CustomError;