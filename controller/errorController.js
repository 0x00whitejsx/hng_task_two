require('dotenv').config({ path: `${process.cwd()}/.env` });


const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message
    const stack = error.stack

    res.status(statusCode).json({
        status,
        message,
        stack
    })
      
}


const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message

    if(error.isOperational){

    return res.status(statusCode).json({
        status,
        message
    })
}
        return res.status(500).json({
            status: 'error',
            message: "Something went wrong"
        })
      
}

const gobalErrorHandler = (err, req, res, next) => {
   
    
    if(process.env.NODE_ENV === 'development'){
        return sendErrorDev(err, res)
    }

    sendErrorProd(err, res)
}

module.exports = gobalErrorHandler