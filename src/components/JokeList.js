export const JokeList () => {


    return (
        <div className="joke-lists-container">
            {/* container for told jokes */}
            <div className="joke-list-container">
                <h2><i className="fa-regular fa-face-grin-tears"></i>Told Jokes<span className="told-count">{toldJokes.length}</span></h2>
                {toldJokes.map(joke => {
                    return (<Joke
                        key={joke.id}
                        joke={joke}
                    />)


                })}
            </div></)
}