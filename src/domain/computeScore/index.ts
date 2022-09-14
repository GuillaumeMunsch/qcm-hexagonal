/* DOMAIN */

import { Quizz } from "../initializeQuizz";

export type PossibleAnswers = {
  isValid: boolean;
  message: string;
  answerId: string;
}[];

export type QuestionAnswer = {
  questionId: string;
  selectedAnswersId: string[];
};

export type QuizzAnswer = {
  questionAnswers: QuestionAnswer[];
};

export type Question = {
  id: string;
  possibleAnswers: PossibleAnswers;
  questionMessage: string;
};

export type GoToNextQuestion = () => void;

/* DEPENDENCIES */

// export interface QuizzStorage {
//   fetchAllQuizzQuestions(): Promise<Question[]>;
//   // eslint-disable-next-line no-unused-vars
//   computeQuizzScore(params: { questionId: string; userAnswers: UserAnswers }): Promise<number>;
// }

/* LOGIC */

export const areAnswersCorrect = ({
  userAnswers,
  possibleAnswers,
}: {
  userAnswers: QuestionAnswer;
  possibleAnswers: PossibleAnswers;
}): boolean => {
  const totalUserAnswersAmount = userAnswers.selectedAnswersId.length;

  const correctAnswers = possibleAnswers.filter(({ isValid }) => isValid);

  const userCorrectAnswersAmount = correctAnswers.filter(({ answerId: questionId }) =>
    userAnswers.selectedAnswersId.includes(questionId)
  ).length;
  const questionCorrectAnswersAmount = correctAnswers.length;

  return (
    userCorrectAnswersAmount === questionCorrectAnswersAmount && userCorrectAnswersAmount === totalUserAnswersAmount
  );
};

type Score = {
  numberOfCorrectQuestions: number;
  numberOfQuestions: number;
};

export const computeScore = (quizz: Quizz, userQuizzSubmition: QuizzAnswer): Score => {
  const numberOfCorrectQuestions = quizz.questions.filter((question) => {
    const userQuestionAnswer = userQuizzSubmition.questionAnswers.find(
      (questionAnswer) => questionAnswer.questionId === question.id
    );

    return areAnswersCorrect({ userAnswers: userQuestionAnswer, possibleAnswers: question.possibleAnswers });
  }).length;

  return {
    numberOfCorrectQuestions,
    numberOfQuestions: quizz.questions.length,
  };
};
