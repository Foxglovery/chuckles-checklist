import { useEffect, useState } from "react"
import "./App.css"
import { getAllJokes } from "./services/jokeService"

export const App = () => {
  //returns state value of jokes
  const [allJokes, setAllJokes] = useState([]) 
  //returns input field value
  const [userInput, setUserInput] = useState("")
  

  // shows all jokes in state
  useEffect(() => {
      getAllJokes().then(jokeArray => {
        //populates the state with all jokes array
        setAllJokes(jokeArray)
        console.log(`jokes caught`)
      })
    }, [])
  return <>
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle's Lame-Ass Jokes</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
      <input
        className=""
        type="text"
        placeholder="New One Liner"
        onChange={(event) => {
          //updates input hook with input value
          setUserInput(event.target.value) 
        }}
      />
      </div>
    </div>
  </>
}


//left off needing to add post options for jokeService to save userInput value to database