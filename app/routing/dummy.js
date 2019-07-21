function tallyScores(arr, user) {
            
    // friendScore will hold a copy of friends after their score is total
    var friendScore = []

    // this will be cleared out every loop. At every loop, total array will
    // push the item into the friendScore array, then become blank, and 
    // redo the process
    var total = []

    // looping through friends arry to get scores
    for(var i = 0; i < arr.length; i++){
        scores = arr[i].scores
        userScores = user.scores

        // getting scores after each answer is compared to each user
        for( var j = 0; j < scores.length; j++) {
            total.push(parseInt(Math.abs(userScores[j] - scores[j])))
        }
        let sum = total.reduce((acc, val) => {
            return acc + val
        });

        // pushing each object from friends array to friendScore array.
        friendScore.push({name: arr[i].name, link: arr[i].link, score: sum})
        var total = []
    }

        // note to self: since 'user' wasn't in array yet, don't have to pop user of new friendScore array 
        // knowing this earlier probably would have made this code shorter.
 
    // this function will take the new array and compare lowest score and spit out one item in the array
    friendFinder(friendScore)
}

function friendFinder(arr){
    var bestMatch = arr[0]
    for(var i = 0; i < arr.length; i++){
        if(arr[i].score < bestMatch.score) {
            var bestMatch = arr[i]

            // if in a function, it looks like I need to put the json response
            // in said in order for it to be called. This was causing a bit of a headache
            // for me.
            res.json(bestMatch)
            console.log(bestMatch)
        }
    }
}
