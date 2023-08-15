import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    const { numJokesToGet = 10 } = this.props;
    const jokes = [...this.state.jokes];
    const seenJokes = new Set();

    try {
      while (jokes.length < numJokesToGet) {
        const res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        const { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          jokes.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ jokes });
    } catch (e) {
      console.log(e);
    }
  }

  generateNewJokes() {
    this.setState({ jokes: [] }, this.getJokes);
  }

  vote(id, delta) {
    this.setState(allJokes => ({
      jokes: allJokes.jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    }));
  }

  render() {
    const { jokes } = this.state;

    if (jokes.length) {
      const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map(joke => (
            <Joke
              text={joke.joke}
              key={joke.id}
              id={joke.id}
              votes={joke.votes}
              vote={this.vote}
            />
          ))}
        </div>
      );
    }

    return null;
  }
}

export default JokeList;
