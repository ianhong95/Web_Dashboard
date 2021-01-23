document.addEventListener('DOMContentLoaded', function() {
    updateNBA();
});

function updateNBA() {
    fetch('/', {
        headers:{'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({'nba_games': 'nba_games'})
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        var i = 0;
        var numGames = Object.keys(json).length;

        for (i = 0; i < numGames; i++) {
            var gameID = 'Game' + String(i)
            var gameInfo = json[gameID];
            var textElem = document.createElement('p');     // Create a new 'p' element. This doesn't go anywhere until you actually add it to something
            document.querySelector('#nbaInfo').append(textElem);    // Find element with id='nbaInfo', and append the newly created 'p' element to it
            textElem.setAttribute('id', gameID);    // Assign an id attribute to the text element ('p')

            var node = document.createTextNode(gameInfo);   // Create text node
            textElem.appendChild(node);     // Append text node to 'p' element
        }
    })
}