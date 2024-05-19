class ExpressError extends Error{
    constructor(statusCode,message ){
super();
       this.statusCode= statusCode;
        this.message=this.message;
    }
}

module.exports=ExpressError;