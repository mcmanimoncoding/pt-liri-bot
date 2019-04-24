require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios");

var moment = require("moment")




let command = process.argv[2];

let searchTerm = process.argv[3];

searchCommand(command, searchTerm);


function searchCommand(command, searchTerm) {
    switch (command) {
        case 'concert-this':
            concertThis(searchTerm);
            break;

        case 'spotify-this':
            spotifyThis(searchTerm);
            break;

        case 'movie-this':
            movieThis(searchTerm);
            break;

        case 'do-what-it-says':
            doWhatItSays(searchTerm);
            break;


    }
}



function concertThis(searchTerm) {
    let queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function(response){
            let concertData = response.data;

            console.log(searchTerm + " Upcoming Shows : ");

            for (var i = 0; i < concertData.length; i++) {
                let concert = concertData[i];

                console.log(
                    "Where: " + concert.venue.city + ", " + concert.venue.country + " at " + concert.venue.name +
                    "\n When: " +moment(concert.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );

};


function spotifyThis(searchTerm) {
// console.log(searchTerm);
var spotifyObj = new Spotify({id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET})

    spotifyObj.search({
            type: "track",
            query: searchTerm,
            limit: 1,
        },
        function (error, data) {
            if (error) {
                console.log("Something went wrong: " + error);
                return;
            }
            console.log("Finally Working!");
            let spotifyInfo = data.tracks.items;
            for  (var i=0; i<1; i++){
                // console.log(spotifyInfo[i]);
                console.log("Song: "+spotifyInfo[i].name+"\nArtist: "+spotifyInfo[i].artists[0].name + "\nAlbum: "+spotifyInfo[i].album.name+"\nURL: "+spotifyInfo[i].preview_url);
            }
        }
    );
};


function movieThis(searchTerm){
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function(response){
        let movieData = response.data;
        console.log("Title: "+ movieData.Title+"\nYear: "+movieData.Year+"\nRating: " + movieData.Rated+"\nRotten Tomatoes Rating: "+ movieData.Ratings['Rotten Tomatoes']+"\nCountry: "+ movieData.Country+"\nLanguage: "+ movieData.Language+"\nPlot: "+ movieData.Plot+"\nActors: "+movieData.Actors)
    })

}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        }
        let randomData = data.split(",");
        console.log(randomData);
        let randCommand = randomData[0];
        let randSearchTerm = randomData[1];
        searchCommand(randCommand, randSearchTerm);
    })
}