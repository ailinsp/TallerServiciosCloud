const fs = require('fs');
const promisify = require('util').promisify;
const {google} = require('googleapis');
const gmailClient = require('./gmailClient');

const gmail = gmailClient();

class serviceGmail 
{
  constructor() 
  {
    // this.gmail = gmailClient();
  }

  notifySuscriptor()
  {
    console.log('Enviando mail...');
    gmail.users.messages.send(
    {
    userId: 'me',
    requestBody: {
      raw: this.createMessage('liza.chambi@gmail.com', 'UNQfy - Nuevo album', "Hola! Se ha publicado un nuevo album de un artista de su interes en UNQfy."),
    },
    });
    console.log('Done!');
  }

  createMessage(subscriptor, subject, mensaje)
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
}
