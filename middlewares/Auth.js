
function Auth(req,res,next){
    if (!req.session.user) {
        res.json({message : "acesso negado"});
    }
    next();
}

module.exports = Auth
