const express = require('express');

const router = express.Router();

//export router to use in server.js .... also return router
module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    try {
      const feedback = await feedbackService.getList();
      return response.json(feedback);
    } catch (err) {
      return next(err);
    }
  });

  //route for detail of speaker
  router.post('/', (request, response) => {
    return response.send('feedback form posted');
  });

  return router;
};
