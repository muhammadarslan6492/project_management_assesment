import admin from 'firebase-admin'

import serviceAccount from '../../config/project-management-tootl-firebase-adminsdk-oq3v8-07536d3873.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

function sendPush(msg) {
  admin
    .messaging()
    .send(msg)
    .then((response) => {
      console.log('Success', response)
    })
    .catch((error) => {
      console.log('error', error.messaging)
    })
}

export default sendPush
