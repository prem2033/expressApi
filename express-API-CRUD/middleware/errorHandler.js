export function notFound(req, res, next){
    res.status(404).json({error : "Not valid endPoint"});
}

export function errorHandler(req, res, next){
    res.status(500).json({error : "Something went wrong.Please try later"})
}