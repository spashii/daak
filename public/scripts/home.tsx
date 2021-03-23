import { render } from 'preact';
import { useState } from 'preact/hooks';

const kitty = require('../assets/kat/kitty.jpg');

const element = document.querySelector('#preact-text');

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>stuff from preact, styles w sass</h1>
      <button onClick={() => setCount(count + 1)}>CLICK ME</button>
      <div style={{ fontSize: `${(count % 2) + 2}rem` }}>{count}</div>
      <div>
        <img height={100} src={kitty}></img>
        from preact
      </div>
    </>
  );
}

render(<App />, element);
