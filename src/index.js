import React, { Component } from "react";
import reactDom from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import ResultBoard from "./components/ResultBoard";

class QuizBee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: [],
      score: 0,
      response: 0
    };
  }
  getQuestion = () => {
    quizService().then((result) => {
      this.setState({
        questionBank: result
      });
    });
  };
  computedAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      response: this.state.response < 5 ? this.state.response + 1 : 5
    });
  };
  playAgain = () => {
    this.getQuestion();
    this.setState({
      score: 0,
      response: 0
    });
  };
  componentDidMount() {
    this.getQuestion();
  }
  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.response < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => {
              return (
                <QuestionBox
                  question={question}
                  options={answers}
                  key={questionId}
                  selected={(answer) => this.computedAnswer(answer, correct)}
                />
              );
            }
          )}
        {this.state.response === 5 ? (
          <ResultBoard score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

reactDom.render(<QuizBee />, document.getElementById("root"));
