var friendsArray = [
    {
        "name": "David Hart",
        "scores": [
        "1",
        "2",
        "5",
        "4",
        "3"
        ]
    },
    {
        "name": "Steven Bob",
        "scores": [
        "4",
        "5",
        "1",
        "4",
        "1"
        ]
    },
    {
        "name": "John Picord",
        "scores": [
        "1",
        "1",
        "5",
        "5",
        "5"
        ]
    }

]

function findFriend(arr) {
    for(var i = 0; i < arr.length; i++){
        console.log(arr.scores[i])
    }
}

module.exports = friendsArray