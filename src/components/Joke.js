import { deleteJoke, toggleToUntold} from "../services/jokeService"
import { jokeFetch } from "../services/jokeService"
export const Joke = ({ joke }) => {
    
    //need to hook up buttons
    
    return <><li className="joke-list-item" key={joke.id}>
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
        </div></li></>
}