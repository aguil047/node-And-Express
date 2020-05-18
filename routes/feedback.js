const express = require('express');

const router = express.Router();

//export router to use in server.js .... also return router
module.exports = (params) => {
  console.log('in feedback');
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    return response.json(feedback);
  });

  //route for detail of speaker
  router.post('/', (request, response) => {
    return response.send('feedback form posted');
  });

  return router;
};
