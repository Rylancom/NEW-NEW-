
const API_KEY = 'your_openai_api_key';  // Replace with your OpenAI API key

document.getElementById('sendBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  displayMessage(userInput, 'user');
  const response = await getChatGPTResponse(userInput);
  displayMessage(response, 'bot');
});

function displayMessage(message, sender) {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = `${sender === 'user' ? 'You' : 'Bot'}: ${message}`;
  messagesDiv.appendChild(newMessage);
  document.getElementById('userInput').value = '';
}

async function getChatGPTResponse(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
