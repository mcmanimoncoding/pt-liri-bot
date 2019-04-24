# pt-liri-bot

Liri is like IPhone's SIRI. It Takes in a user input and outputs relevant information.

Unlike SIRI, LIRI operates solely within the CLI and thus takes user input in the form of ARGVs.


## To Deploy

1. Clone this repo
2. Run the npm install within the terminal
3. run command node liri.js [argv command] [argv parameter]

## The Functions

### Concert This

If you run *node liri.js concert-this pink* [for example], LIRI will return concert dates and times for the artist 'Pink' using the *Bands In Town* API

### Spotify This

If you run *node liri.js spotify-this jumper* [for example], LIRI will return the song details for Jumper by Third Eye Blind using the *Spotify* API

### Movie This

If you run *node liri.js movie-this predator* [for example], LIRI will return the movie details for Predator starring Arnold Schwarzenegger and Jesse Ventura using the *OMDB* API

### Do What It Says

The command *node liri.js do-what-it-says* pulls the task information from the included *random.txt* file included in this repo.