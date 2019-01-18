/******************************
 

    Middleware for async functions to not write try-catch in every request.
 

 ******************************/


module.exports = function(handler){
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }catch(ex){
            next(ex);
        }
    }
}