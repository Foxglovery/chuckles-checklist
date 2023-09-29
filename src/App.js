import { useEffect, useState } from "react"
import "./App.css"
import { getAllJokes, createJoke, toggleToUntold, deleteJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"


export const App = () => {
  //returns state value of jokes in array
  const [allJokes, setAllJokes] = useState([])
  //returns input field value
  const [userInput, setUserInput] = useState("")
  //returns told jokes in array
  const [toldJokes, setToldJokes] = useState([])
  //returns untold jokes in array
  const [untoldJokes, setUntoldJokes] = useState([])
  //new state variables for:
  const [jokeEdited, setJokeEdited] = useState(false)

  const jokeFetch = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr)
    })
  }


  // shows all jokes in state
  useEffect(() => {
    getAllJokes().then(jokeArray => {
      //populates the state with all jokes array
      setAllJokes(jokeArray)
      console.log(`jokes caught`)
    })
  }, [])

  // useEffect(() => {

  // },[])

  useEffect(() => {
    const toldJokes = allJokes.filter(joke => joke.told)
    setToldJokes(toldJokes)
  }, [allJokes])

  useEffect(() => {
    const untoldJokes = allJokes.filter(joke => !joke.told)
    setUntoldJokes(untoldJokes)
  }, [allJokes])

  return <>
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle's Heckin' Lame Jokes</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={userInput}
          placeholder="New One Liner"
          onChange={(event) => {
            //updates input hook with input value
            setUserInput(event.target.value)
          }}
        />
        <div>
          <button className="joke-input-submit" onClick={() => {
            createJoke(userInput)
              .then(() => {
                setUserInput("")
                jokeFetch()
              })
              .catch(error => {
                // for errors. Unsure why.
                console.error(error);
              });
          }}>Add Joke</button>
        </div>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2><i className="fa-regular fa-face-grin-tears"></i>Told Jokes<span className="told-count">{toldJokes.length}</span></h2>
          {toldJokes.map(joke => {
            return (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
              <button onClick={() =>
              deleteJoke(joke.id)
              .then(() => {
                jokeFetch()
              })
              }><i class="fa-solid fa-dumpster-fire fa-lg"></i></button>
            </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() =>
                    toggleToUntold(joke.id, joke.text, joke.told)
                      //HAD TO USE .THEN OR ELSE IT WOULD NOT REFETCH
                      .then(() => {

                        jokeFetch()
                      })
                  }><i class="fa-solid fa-person-harassing fa-lg"></i></button>
                </div>
              </li>)
          })}
        </div>
        <div className="joke-list-container">
          <h2><i className="fa-regular fa-face-flushed"></i>Untold Jokes<span className="untold-count">{untoldJokes.length}</span></h2>
          {untoldJokes.map(joke => {
            return (
            <li className="joke-list-item" key={joke.id}>
              <p className="joke-list-item-text">{joke.text}</p>
            <div className="joke-list-action-delete">
              <button onClick={() =>
              deleteJoke(joke.id)
              .then(() => {
                jokeFetch()
              })
              }><i class="fa-solid fa-dumpster-fire fa-lg"></i></button>
            </div>
              <div className="joke-list-action-toggle">
                <button onClick={() =>
                  toggleToUntold(joke.id, joke.text, joke.told)
                    //HAD TO USE .THEN with arrow OR ELSE IT WOULD NOT REFETCH
                    .then(() => {

                      jokeFetch()
                    })
                }><i class="fa-solid fa-person-harassing fa-lg"></i></button>
              </div></li>)
          })}
        </div>
      </div>
    </div>
  </>
}


