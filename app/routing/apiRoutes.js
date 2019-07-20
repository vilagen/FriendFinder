var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends)
    })

    app.post("/api/friends", function(req, res) {
        // input logic 
        // let friend = req.body

        friends.push(req.body)
        res.json(true)

        tallyScores(friendsArray, newFriend)
       

        function tallyScores(arr, user) {
            var friendScore = []
            var total = []
            for(var i = 0; i < arr.length; i++){
                scores = arr[i].scores
                userScores = user.scores
                for( var j = 0; j < scores.length; j++) {
                    total.push(parseInt(Math.abs(userScores[j] - scores[j])))
                }
                let sum = total.reduce((acc, val) => {
                    return acc + val
                });
                friendScore.push({name: arr[i].name, link: arr[i].link, score: sum})
                var total = []
            }
            friendScore.pop()
            friendFinder(friendScore)
            
        }
        
        function friendFinder(arr){
            var bestMatch = arr[0]
            for(var i = 0; i < arr.length; i++){
                if(arr[i].score < bestMatch.score) {
                    bestMatch = arr[i]
                }
            }
            $("#matchedFriend").text("Name: " + bestMatch.name)
            $("#matchedLink").attr("href", bestMatch.link)
            $("#matchedLink").on("click", function(event){
                event.preventDefault();
                window.open(bestMatch.link)
            })
        }     
    })
}

