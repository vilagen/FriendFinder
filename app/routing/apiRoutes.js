var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends)
    })
    
    app.post("/api/friends", function(req, res) {
        var user = req.body
        var total = []
        var friendScore = []
    
        for(let i = 0; i < friends.length; i++){
            scores = friends[i].scores
            userScores = user.scores

            for( let j = 0; j < scores.length; j++) {
                total.push(parseInt(Math.abs(userScores[j] - scores[j])))
            }
            sum = total.reduce((acc, val) => {return acc + val});
            friendScore.push({name: friends[i].name, link: friends[i].link, score: sum})
            var total = []
            console.log(friendScore)
        }
        
            var bestMatch = friendScore[0]
            for(let i = 0; i < friendScore.length; i++){
                if(friendScore[i].score < bestMatch.score) {
                    var bestMatch = friendScore[i]
                }
            }

        res.json(bestMatch)
        friends.push(user);
    })
}