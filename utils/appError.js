class appError extends Error{
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error'
        console.log(this.status)
        this.isOpreational = true;
        this.message = message
        Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = appError;