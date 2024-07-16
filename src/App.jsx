import './App.css';

function App() {

  function onSubmit(arg)
  {

  }
  return (
    <div className="main">
      <div className="playerFormWrapper">
      <form className="playerForm" onSubmit={onSubmit}>
        <label htmlFor="Firstname"> First name: </label>
        <input id="Firstname" type="text">
        </input>
        <label htmlFor="submit"> All done? </label>
        <input id="submit" type="submit" enterKeyHint="enter" defaultValue="Submit"></input>
      </form>
    </div>
    </div>
  );
}

export default App;
