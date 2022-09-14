/* DOMAIN */

export type PossibleAnswers = {
  isValid: boolean;
  message: string;
  questionId: string;
}[];

export type UserAnswers = string[];

export type Question = {
  id: string;
  possibleAnswers: PossibleAnswers;
  questionMessage: string;
};

export type Quizz = {
  name?: string;
  questions: Question[];
  score: number;
};

export type AreAnswersCorrect = ({
  userAnswers,
  possibleAnswers,
}: {
  userAnswers: UserAnswers;
  possibleAnswers: PossibleAnswers;
}) => boolean;
export type GoToNextQuestion = () => void;

/* DEPENDENCIES */

export interface QuizzStorage {
  fetchAllQuizzQuestions(): Promise<Question[]>;
  // eslint-disable-next-line no-unused-vars
  computeQuizzScore(params: { questionId: string; userAnswers: UserAnswers }): Promise<number>;
}

/* LOGIC */

export const areAnswersCorrect: AreAnswersCorrect = ({ userAnswers, possibleAnswers }) => {
  const totalUserAnswersAmount = userAnswers.length;

  const correctAnswers = possibleAnswers.filter(({ isValid }) => isValid);

  const userCorrectAnswersAmount = correctAnswers.filter(({ questionId }) => userAnswers.includes(questionId)).length;
  const questionCorrectAnswersAmount = correctAnswers.length;

  return (
    userCorrectAnswersAmount === questionCorrectAnswersAmount && userCorrectAnswersAmount === totalUserAnswersAmount
  );
};
