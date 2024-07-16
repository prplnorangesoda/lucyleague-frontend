import React, {useState} from 'react';

function PlayerForm(props)
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");


  // User:
  // email: string
  // first_name: string
  // last_name: string
  // username: string
  /**
   * @param {React.FormEvent} FormEvent 
   */
  function onSubmit(FormEvent)
  {
    FormEvent.preventDefault();
    if(!firstName | !lastName | !email | !userName) {
      return;
    }
    console.log(firstName, lastName, email, userName);
    console.log(FormEvent);
    let body = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      username: userName
    }
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    fetch("http://localhost:8080/users", 
      {method: "POST", body: JSON.stringify(body), headers: headers}
    )
  }
  
  return (<div className="playerFormWrapper">
      <form className="playerForm" onSubmit={onSubmit}>
        <label htmlFor="Firstname"> First name: </label>
        <input 
          id="Firstname" 
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        >
        </input>
        <label htmlFor="Lastname"> Last name: </label>
        <input 
          id="Lastname" 
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        >
        </input>
        <label htmlFor="Email"> Email: </label>
        <input 
          id="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
        </input>
        <label htmlFor="Username"> Username: </label>
        <input 
          id="Username" 
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        >
        </input>
        <label htmlFor="submit"> All done? </label>
        <input id="submit" type="submit" enterKeyHint="enter" defaultValue="Submit" onSubmit={onSubmit}></input>
      </form>
    </div>)
}

export default PlayerForm;
  