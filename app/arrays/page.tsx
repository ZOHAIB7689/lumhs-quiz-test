"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import arrayQuestions from "./questions.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define a TypeScript type for the quiz data
type QuizData = {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
};

// Flatten the array of arrays to a single array of QuizData objects and shuffle them
const quizData: QuizData[] = arrayQuestions.flat().sort(() => Math.random() - 0.5).slice(0, 10); // Select 10 random questions

const QuizApp: React.FC = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [showConfetti, setShowConfetti] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | null;
  }>({});

  // Use this to get the screen dimensions dynamically
  const { width, height } = useWindowSize();

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const loadQuiz = () => {
    setSelectedAnswer(null);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.id);
  };

  const getTimeTaken = () => {
    const endTime = new Date();
    const timeTaken = new Date(endTime.getTime() - startTime.getTime());
    setMinutes(timeTaken.getUTCMinutes());
    setSeconds(timeTaken.getUTCSeconds());
  };

  const handleSubmit = () => {
    // Check if an answer is selected
    if (selectedAnswer) {
      // Increment score if the answer is correct
      if (selectedAnswer === quizData[currentQuiz].correct) {
        setScore((prevScore) => prevScore + (100 / quizData.length)); // Dynamic score calculation
      }

      // Save the user's answer
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuiz]: selectedAnswer,
      }));

      // Move to the next question if available
      if (currentQuiz < quizData.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        loadQuiz();
      } else {
        // Finish the quiz and calculate the time taken
        getTimeTaken();
        setIsFinished(true);

        // Trigger confetti if the score is 80% or above
        if ((score / (quizData.length * 10)) * 100 >= 50) {
          handleConfetti();
        }
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handleConfetti = () => {
    // Start the confetti
    setShowConfetti(true);

    // Stop the confetti after 30 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 30000);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-[#b8c6db] to-[#f5f7fa] pt-16">
      {/* Show confetti only when the quiz is finished */}
      {showConfetti && <Confetti width={width} height={height} />}

      <header className="fixed top-0 z-50 w-full bg-gray-800 py-2 text-center text-white shadow-lg">
        Challenge Your Chemistry of Lipids Knowledge: Tackling
        <strong> Question {currentQuiz + 1} </strong> of {quizData.length}
      </header>

      <div className="w-full max-w-md md:max-w-lg mx-4 overflow-auto rounded-lg bg-white shadow-2xl transform transition-all duration-300 hover:scale-105">
        {!isFinished ? (
          <div className="quiz-header p-6 md:p-16">
            <h2 className="my-1 p-3 text-center text-xl md:text-2xl font-semibold">
              {quizData[currentQuiz].question}
            </h2>
            <ul className="list-none p-0">
              {["a", "b", "c", "d"].map((key) => (
                <li key={key} className="my-2 md:my-4 text-lg md:text-xl">
                  <input
                    type="radio"
                    id={key}
                    name="answer"
                    className="mr-2 cursor-pointer"
                    checked={selectedAnswer === key}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={key} className="cursor-pointer">
                    {quizData[currentQuiz][key as keyof QuizData]}
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-4 md:mt-8 flex justify-center">
              <Button
                className="inline-flex h-8 md:h-10 items-center justify-center rounded-md bg-black px-6 md:px-8 text-lg font-bold text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="quiz-header p-6 md:p-16">
            <h2 className="my-4 text-center">
              You got
              <b>
                {score.toFixed(2)} out of {100} scores.
              </b>
            </h2>
            <h2 className="my-4 text-center">
              In {minutes} Minutes and {seconds} Seconds.
            </h2>

            <div className="my-4 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Review your Answers</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-h-screen max-w-lg mx-auto p-10 overflow-y-auto">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Review Your Answers:</AlertDialogTitle>
                    <AlertDialogDescription>
                      <ul>
                        {quizData.map((quiz, index) => (
                          <li key={index} className="my-2">
                            <p>
                              <b>Question {index + 1}:</b> {quiz.question}
                            </p>
                            <p>
                              <b>Your Answer:</b>
                              {quiz[userAnswers[index] as keyof QuizData] || "No Answer"}
                            </p>
                            {userAnswers[index] !== quiz.correct && (
                              <p className="text-red-500">
                                <b>Correct Answer:</b> {quiz[quiz.correct as keyof QuizData]}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Thank you</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="mt-4 md:mt-8 flex justify-center">
              <Button
                className="inline-flex h-8 md:h-10 items-center justify-center rounded-md bg-black px-6 md:px-8 text-lg font-bold text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleConfetti}
              >
                Congratulations
              </Button>
            </div>
          </div>
        )}
      </div>

      <footer className="relative bottom-0 w-full py-3 md:py-5 text-center">
        <p className="text-black">
          Built with 💚 by 
          <a
            href="https://www.linkedin.com/in/zohaib-baloch-78974b2b5/"
            target="_blank"
            className="font-bold text-black no-underline hover:underline"
          >
            Zohaib
          </a>
        </p>
      </footer>
    </div>
  );
};

export default QuizApp;
