module.exports.index = function(req, res){
    return res.json(200, {
        message: "Version @2 of api",
        posts: []
    })
}