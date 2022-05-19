<script>
  const getElement = (id) => document.getElementById(id);

  const addMessage = (message) => {
    const pTag = document.createElement('p');
    pTag.appendChild(document.createTextNode(message));
    getElement('messages').appendChild(pTag);
  };

  const ws = new WebSocket('ws://localhost:3030');

  ws.onopen = () => { 
    console.log('Now connected'); 
  };

  ws.onmessage = (event) => {
    const messages = JSON.parse(event.data);
    messages.forEach(addMessage);
  };

  const fire = () => {
    const username = getElement('name').value || '???'
    ws.send(`${username}: ${getElement('message').value}`);
    getElement('message').value = '';
  };
</script>

<div>
	<input id="name"/>
  <textarea id="message" ></textarea>
  <button onClick={fire}>Send</button>
  <div id='messages'></div>
</div>
