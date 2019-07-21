var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends)
    })
    
    app.post("/api/friends", function(req, res) {
        var user = req.body
        var total = []
        var friendScore = []
        
        // using this for loop to loop friends array 
        for(let i = 0; i < friends.length; i++){
            scores = friends[i].scores
            userScores = user.scores

            // looping inside of a loop to compare each answer with each person in the array
            // then is pushed to an empty total array
            for( let j = 0; j < scores.length; j++) {
                total.push(parseInt(Math.abs(userScores[j] - scores[j])))
            }
            
            // every time the loop is done for each score will 'reduce' to one value in the total array (sum)
            // friendScore is pushing each next person into their own object in the array, with their own score
            // example: friendScore([name: 'Dave', link: 'www.pic1.com', score: 22], [name: 'Megan Markle', link: 'www.pic2.com', score: 14])
            sum = total.reduce((acc, val) => {return acc + val});
            friendScore.push({name: friends[i].name, link: friends[i].link, score: sum})
            // return total to empty value for each loop.
            var total = []
        }

            // bestMatch starts initially as the first item in friendScore. If lower, replaced with new person.
            var bestMatch = friendScore[0]
            for(let i = 0; i < friendScore.length; i++){
                if(friendScore[i].score < bestMatch.score) {
                    var bestMatch = friendScore[i]
                }
            }

        // return bestMatch
        res.json(bestMatch)

        // something to note: the new user will not be in the array during calculating unlike on front end.
        // I think it's because user isn't being pushed to the array until AFTER the code is run.
        friends.push(user);
    })
}