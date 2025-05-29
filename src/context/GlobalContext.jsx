import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [data, setData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(50);

  // pindah soal
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    } else {
      setIncorrectAnswers((prevCount) => prevCount + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // handle reset quiz
  const handleReset = () => {
    setData([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimeRemaining();
    fetchData();
  };

  let state = {
    data,
    setData,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    correctAnswers,
    setCorrectAnswers,
    incorrectAnswers,
    setIncorrectAnswers,
    timeRemaining,
    setTimeRemaining,
  };

  let handleFunction = {
    handleAnswerClick,
    handleReset,
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
