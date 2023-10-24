import axios from 'axios';

// Function to send request to Flask backend
const postMessageToFlask = async (text) => {
  const payload = {
    messages: [
      {
        role: 'user',
        content: text,
      },
    ],
  };

  // Create a fetch request
  const response = await axios({
    method: 'post',
    url: 'http://localhost:5001/chat/completions',
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'stream'
  });

  response.data.on('data', (chunk) => {
    let data = chunk.toString();
    let messages = data.split('\n\n');
    for (let message of messages) {
      if (message.startsWith('data: ')) {
        if (message.includes('[DONE]')) {
          console.log('Done');
          break;
        } 
        
        const eventData = JSON.parse(message.replace('data: ', ''));
        console.log('Received message:', eventData.choices[0].delta.content);
      } 
    }
  });
};

// Main function
(async () => {
  try {
    await postMessageToFlask('Hello, how are you?');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();