var friend = require("../data/friend")

module.exports = function(app) {
    app.get("/api/friend", function(req, res){
        res.json(friend)
    })

    app.post("/api/friend", function(req, res) {
        friend.push(req.body)
        res.json(true)
    })
}

