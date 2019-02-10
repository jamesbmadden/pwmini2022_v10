const functions = require('firebase-functions');

const admin = require('firebase-admin');

const url = require('url');

admin.initializeApp(functions.config().firestore);

var fs = admin.firestore();
fs.settings({timestampsInSnapshots: true});

function asyncForEach(array, callback) {
  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
    resolve();
  })
}

const blocks = ['1.1','1.2','1.3','1.4','2.1','2.2','2.3','2.4'];

exports.oldHomework = functions.https.onRequest(async (request, response) => {
  var now = new Date();
  await asyncForEach(blocks, async (block) => {
    let blockDoc = fs.collection('classes').doc(block);
    docSnap = await blockDoc.get()
    let classes = docSnap.data();
    for (var aClass in classes) {
      classes[aClass]['homework'] = classes[aClass]['homework'].filter(work => {
        var dueDate = new Date(work['date']);
        var yearDiff = dueDate.getFullYear() - now.getFullYear();
        var monthDiff = dueDate.getMonth() - now.getMonth();
        var dayDiff = dueDate.getDate() - now.getDate();
        if (yearDiff < 0) {
          return false;
        } else if (yearDiff == 0 && monthDiff < 0) {
          return false;
        } else if (yearDiff == 0 && monthDiff == 0 && dayDiff <= 0) {
          return false;
        } else {
          return true;
        }
      });
      classes[aClass]['events'] = classes[aClass]['events'].filter(work => {
        var dueDate = new Date(work['date']);
        var yearDiff = dueDate.getFullYear() - now.getFullYear();
        var monthDiff = dueDate.getMonth() - now.getMonth();
        var dayDiff = dueDate.getDate() - now.getDate();
        if (yearDiff < 0) {
          return false;
        } else if (yearDiff == 0 && monthDiff < 0) {
          return false;
        } else if (yearDiff == 0 && monthDiff == 0 && dayDiff <= 0) {
          return false;
        } else {
          return true;
        }
      });
    }
    blockDoc.update(classes);
  });
  response.status('200').send('successful');
  response.end();
});

async function getClasses(email) {
  try {
    let userSnap = await fs.collection('users').doc(email).get();
    return userSnap.data().classes;
  } catch (error) {
    return undefined;
  }
}

async function getHomework(classList, images) {
  const homework = [];
  let classesCollection = await fs.collection('classes');
  await asyncForEach(blocks, async (block) => {
    let theClass = classList[block];
    try {
      let classSnap = await classesCollection.doc(block).get();
      const classData = classSnap.data()[theClass];
      let classWork;
      if (images == 'true') {
        classWork = classData.homework;
      } else {
        classWork = classData.homework.map(work => {
          return {title: work.title, date: work.date};
        });
      }
      homework.push(classWork);
    } catch (error) {
      return 'Error in class '+theClass+': '+error.message;
    }
  });
  return homework;
}

async function getEvents(classList) {
  const events = [];
  let classesCollection = await fs.collection('classes');
  await asyncForEach(blocks, async (block) => {
    let theClass = classList[block];
    try {
      let classSnap = await classesCollection.doc(block).get();
      const classData = classSnap.data()[theClass];
      events.push(classData.events);
    } catch (error) {
      return 'Error in class '+theClass+': '+error.message;
    }
  });
  return events;
}

exports.homeworkForEmail = functions.https.onRequest(async (request, response) => {
  const email = request.url.split('/')[3];
  const classList = await getClasses(email);
  const homework = await getHomework(classList, true);
  response.status('200').send(homework);
  response.end();
});

exports.eventsForEmail = functions.https.onRequest(async (request, response) => {
  const email = request.url.split('/')[3];
  const classList = await getClasses(email);
  const events = await getEvents(classList);
  response.status('200').send(events);
  response.end();
});

exports.classesForEmail = functions.https.onRequest(async (request, response) => {
  const email = request.url.split('/')[3];
  const classList = await getClasses(email);
  if (classList === undefined) {
    response.writeHead(200, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
    response.end('{}');
    return;
  }
  response.writeHead(200, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
  response.end(JSON.stringify(classList));
});

exports.getUser = functions.https.onRequest(async (request, response) => {
  const email = request.url.split('/')[3].split('?')[0];
  const classList = await getClasses(email);
  if (classList === undefined) {
    const user = {}
    response.writeHead(201, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
    response.end(JSON.stringify(user));
    return;
  }
  const searchParams = new url.URL('https://powmini2022.firebaseapp.com'+request.url).searchParams;
  console.log(searchParams.get('images'));
  const user = {
    "classes":classList,
    "homework":await getHomework(classList, searchParams.get('images')),
    "events":await getEvents(classList)
  }
  response.writeHead(200, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
  response.end(JSON.stringify(user));
});

async function setUserProp(user, props) {
  await fs.collection('users').doc(user).add(props);
}

exports.miniEvents = functions.https.onRequest(async (request, response) => {
  const collection = await fs.collection('mini');
  try {
    let snap = await collection.doc('school').get();
    const events = snap.data()['events'];
    response.writeHead(200, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
    response.end(JSON.stringify(events));
  } catch (error) {
    response.writeHead(400, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
    response.end(JSON.stringify(error));
  }
});

exports.availableClasses = functions.https.onRequest(async (request, response) => {
  let classesCollection = fs.collection('classes');
  let classes = {};
  await asyncForEach(blocks, async block => {
    let blockSnap = await classesCollection.doc(block).get();
    classes[block] = Object.keys(blockSnap.data());
  });
  response.writeHead(200, {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.0.0', 'content-type':'application/json'});
  response.end(JSON.stringify(classes));
});