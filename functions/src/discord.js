const functions = require('firebase-functions');

const admin = require('firebase-admin');

const fetch = require('node-fetch');

const MINI_BLOCKS = ['1.3', '1.4', '2.3', '2.4'];

const blocks = ['1.1','1.2','1.3','1.4','2.1','2.2','2.3','2.4'];

const WEBHOOK_URL = require('./webhook-url');

var fs = admin.firestore();

const classList = {
  '1.3': 'Mini Math 10',
  '1.4': 'Mini Science 9',
  '2.3': 'Mini English 9',
  '2.4': 'Mini Social Studies 9'
}

async function getHomeworkData () {
  const homework = [];
  let classesCollection = await fs.collection('classes').get();
  let index = 0;
  classesCollection.forEach(block => {
      if (MINI_BLOCKS.includes(blocks[index])) {
        let theClass = classList[blocks[index]];
        let classData = block.data()[theClass];
        let classWork;
        classWork = classData.homework;
        homework.push(classWork);
      }
      index++;
  });
  return homework;
}

module.exports = functions.https.onRequest(async (request, response) => {
  let homeworkData = await getHomeworkData();
  let homework = [];
  homeworkData.forEach((block, index) => block.forEach(work => {
    let workWithClass = work;
    workWithClass.class = classList[MINI_BLOCKS[index]];
    homework.push(workWithClass);
  }));
  let embeds = homework.map(work => {
    let data = {
      description: `${work.class}: ${work.title} for ${work.date}`
    }
    if (work.image) {
      data.image = {
        url: work.image
      }
    }
    return data;
  });
  const post_body = {
    content: "Here's What's Coming Up:",
    embeds
  };
  let discordResponse = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post_body)
  });
  response.send(discordResponse);
});