import { GlobalContext } from "../../context/GlobalContext";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { state, handleFunction } = useContext(GlobalContext);
  const {
    data,
    setData,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    correctAnswers,
    incorrectAnswers,
    timeRemaining,
    setTimeRemaining,
  } = state;

  const { handleAnswerClick, handleReset } = handleFunction;

  // fetching data
  useEffect(() => {
    // asincronus
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
        );
        setData(result.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // handle timer
  useEffect(() => {
    const timer = setTimeout(() => {
      // timer selesai soal ditutup
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        setCurrentQuestionIndex(data.length);
      }
    }, 1000);

    // Simpan localstorage
    return () => {
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          data,
          currentQuestionIndex,
          correctAnswers,
          incorrectAnswers,
          timeRemaining,
        })
      );
      clearTimeout(timer);
    };
  }, [timeRemaining, data.length]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-24 bg-gray-50">
      {currentQuestionIndex < data.length && (
        <div
          key={data[currentQuestionIndex].question}
          className="shadow-lg relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col px-4 md:px-10 py-8 md:py-20 gap-3 rounded-md bg-white"
        >
          {/* Jumlah soal yang dikerjakan dan total soal */}
          <div className="font-semibold text-white w-24 p-2 rounded-md text-center -mt-4 absolute right-4 md:right-10 top-0 bg-indigo-600 border-b-2 border-indigo-900 shadow-md">
            {currentQuestionIndex + 1}/{data.length}
          </div>

          {/* function format timer */}
          <div className="font-semibold text-black w-16 p-1 rounded-md text-center bg-slate-100 hover:bg-slate-200 border-b-4 border-slate-300">
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>

          <h1 className="font-semibold text-xl">
            {data[currentQuestionIndex].question}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data[currentQuestionIndex].incorrect_answers.map(
              (answer, index) => (
                <div
                  key={index}
                  className="rounded-xl text-white font-semibold p-3 md:p-5 bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-900 cursor-pointer"
                  onClick={() => handleAnswerClick(false)}
                >
                  <p>{answer}</p>
                </div>
              )
            )}
            <div
              className="rounded-xl text-white font-semibold p-3 md:p-5 bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-900 cursor-pointer"
              onClick={() => handleAnswerClick(true)}
            >
              <p>{data[currentQuestionIndex].correct_answer}</p>
            </div>
          </div>
        </div>
      )}

      {currentQuestionIndex === data.length && (
        <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg">
          <div className="text-center space-y-5">
            <div>
              <img src="" alt="" />
            </div>
            <p className="text-xl font-semibold">
              Congratulations, you have completed the quiz! 🏆
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p>Correct Answer</p>
                <div className="bg-indigo-600  text-white p-10 text-3xl font-bold rounded-lg">
                  {correctAnswers}
                </div>
              </div>
              <div className="space-y-2">
                <p>Incorrect Answer</p>
                <div className="bg-indigo-600 text-white p-10 text-3xl font-bold rounded-lg">
                  {incorrectAnswers}
                </div>
              </div>
              <div className="space-y-2">
                <p>Total Answer</p>
                <div className="bg-indigo-600 text-white p-10 text-3xl font-bold rounded-lg">
                  {correctAnswers + incorrectAnswers}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <Link
                onClick={handleReset}
                className="bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-900 p-3 rounded-md text-white"
              >
                Play Again
              </Link>
              <Link
                to={"/"}
                className="bg-slate-200 hover:bg-slate-100 border-b-4 border-slate-300 p-3 rounded-md text-neutral-900"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
