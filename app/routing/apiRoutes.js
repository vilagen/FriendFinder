var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends)
    })
    
    app.get('/api/match/:id', function(req, res) {
       const id = req.params.id //0
       const user = friends[id]; // David ...

       const friendScore = [];
       
       // make sure user isn't included in score comparison 
       const otherFriends = friends.filter((friend, id) => id !== user.id);

        // loop over friends
        for(var i = 0; i < otherFriends.length; i++){
            const scores = otherFriends[i].scores
            const userScores = user.scores

            const differeneFromUser = scores.reduce(function(difference, score, index) {
                // calculate the delta between user score and friend score
                const currentScoreDifference = (parseInt(Math.abs(userScores[index] - score)));
                // add to total
                return difference +  currentScoreDifference;
            }, 0);

            // push friends with score to new array 
            friendScore.push({name: otherFriends[i].name, link: otherFriends[i].link, score: differeneFromUser})
        }

    
        let bestMatch = friendScore[0];

        // loop over friendScore array 
        for(let i = 0; i < friendScore.length; i++){

            if(friendScore[i].score < bestMatch.score) {
                bestMatch = friendScore[i];
            }
        }

      res.json(bestMatch);
    });

    app.post("/api/friends", function(req, res) {
        // input logic 
        const  user = req.body
        friends.push(user);

        res.json({
            id: friends.length - 1
        });
    })

    
    var friendScore = []
    
    friendFinder(friendScore)

        
            $("#matchedFriend").text("Name: " + bestMatch.name)
            $("#matchedLink").attr("href", bestMatch.link)
            $("#matchedLink").on("click", function(event){
                event.preventDefault();
                window.open(bestMatch.link)
            })  
        friends.push(req.body)
        friends.push(bestName)
        friends.push(bestLink)
        res.json(true)       
    }
}
