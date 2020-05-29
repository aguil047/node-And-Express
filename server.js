const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
//bring in routes
const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

//using lowercase beacuse it is a class instance. the constructor expects a data file that points to the data, .json file
const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

//have to create a instance of express....() beacuse its a function
const app = express();

//define a port for application to listen to
const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['ikdcnd9d7fs8f0', 'df4d5b456sd1bd'],
  })
);

//tell express to use ejs
app.set('view engine', 'ejs');
//tell express where to find the views
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    //response.locals has a object of speakers names
    //console.log(response.locals);

    return next();
  } catch (err) {
    return next(err);
  }
});

//middleware
//middleware look like
//  app.use(callback)
//  app.use(path, callback)
//routing middleware -> app.[get | post | put | delete |...](path, callback)

//this middleware listen on the slash path
app.use(
  '/',
  routes({
    speakersService,
    feedbackService,
  })
);

// start the server and tell it where to listen
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
