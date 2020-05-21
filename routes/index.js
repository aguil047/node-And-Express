const express = require('express');
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');
//calling express router constructer to create a router object
const router = express.Router();

//export router to use in server.js .... also return router
module.exports = (params) => {
  //route to open in the browser
  //replace app with router
  //app.get('/', (request, response) => {

  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const topSpeakers = await speakersService.getList();
    response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
