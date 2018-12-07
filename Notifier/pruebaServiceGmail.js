// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.

const fs = require('fs');
const promisify = require('util').promisify;
const {google} = require('googleapis');
const gmailClient = require('./gmailClient');

const serviceGmail = gmailClient();

serviceGmail.users.messages.send(
{
  userId: 'me',
  requestBody: {
    raw: createMessage('liza.chambi@gmail.com', 'Mail de prueba', "Hola."),
  },
});
console.log('Done!');

function createMessage(subscriptor, subject, mensaje)
{
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = 
  [
    `To: <${subscriptor}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    mensaje,
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); 
  return encodedMessage;
}
