import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }
  /** restartGame: updates the state and restarts the game */
  restartGame() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  /** render: render game */
  render() {
    let isLost, isWon;
    if (this.guessedWord().join("") === this.state.answer) {
      isWon = true;
    } else {
      isWon = false;
    }
    if (this.state.nWrong === this.props.maxWrong) {
      isLost = true;
    } else {
      isLost = false;
    }
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={
            this.state.nWrong < 6
              ? this.props.images[this.state.nWrong]
              : this.props.images[this.props.maxWrong]
          }
          alt={altText}
        />
        <p className="Hangman-guesses">
          Number of wrong guesses: {this.state.nWrong}
        </p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        {isLost ? (
          <div className="Hangman-lose">
            <p>You Lost!</p>
            <p>
              The correct word is{" "}
              <span className="Hangman-answer">{this.state.answer}</span>
            </p>
            <button className="Hangman-restart" onClick={this.restartGame}>
              Restart
            </button>
          </div>
        ) : isWon ? (
          <div className="Hangman-win">
            <p>You Won!</p>
            <button className="Hangman-restart" onClick={this.restartGame}>
              Restart
            </button>
          </div>
        ) : (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        )}
      </div>
    );
  }
}

export default Hangman;
