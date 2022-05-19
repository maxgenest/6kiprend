<script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<input id="name"/>
  <textarea id="message" ></textarea>
  <button onClick="fire()">Send</button>
  <div id='messages'></div>

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
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>