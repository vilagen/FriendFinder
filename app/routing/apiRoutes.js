var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends)
    })
    
    // calling only one specific api result for the best
    app.get('/api/match/:id', function(req, res) {
       const id = req.params.id //0
       console.log(id)
       const user = friends[id]; // David ...
       console.log("friends: " + user)
    //    const user = friends[id]; // David ...

       const friendScore = [];
       
    //    make sure user isn't included in score comparison 
    //    const otherFriends = friends.filter((friends, id) => id !== user.id);
    //    const otherFriends = friends.filter(function(friend, id) {
    //    id !== user.id
    // })
    //    const otherFriends = friends.filter(friend =>friend.id);

        const otherFriends = friends.filter(friend=> friend[id] !== id)
        console.log("This is for otherfriends " + otherFriends)

        // loop over friends
        for(let i = 0; i < otherFriends.length; i++){
            const scores = otherFriends[i].scores
            const userScores = user.scores

            const differeneFromUser = scores.reduce(function(difference, score, index) {
                console.log("differenceFromUser: " + differenceFromUser)
                // calculate the delta between user score and friend score
                const currentScoreDifference = (parseInt(Math.abs(userScores[index] - score)));
                console.log("currentScoredifference: " + currentScoreDifference)
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
      console.log("This is on server bestMatch " + bestMatch)
      
    });

    app.post("/api/friends", function(req, res) {
        const  user = req.body
        friends.push(user);

        // when getting a response, make sure not to include current user
        res.json({
            id: friends.length - 1
        });
    })
}
