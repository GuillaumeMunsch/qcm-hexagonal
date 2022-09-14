export type PossibleAnswers = {
  isValid: boolean;
  message: string;
  answerId: string;
}[];

export type Question = {
  id: string;
  possibleAnswers: PossibleAnswers;
  questionMessage: string;
};

export type Quizz = {
  name?: string;
  questions: Question[];
};

type Dependencies = {
  extractNRandomsElements: <T>(number: number, set: T[]) => T[];
  fetchAllQuestions: () => Question[];
};

const initializeQuizz =
  ({ extractNRandomsElements, fetchAllQuestions }: Dependencies) =>
  (name?: string) => {
    const allQuestions = fetchAllQuestions();
    const questions = extractNRandomsElements(30, allQuestions);
    return {
      name,
      questions,
    };
  };

export default initializeQuizz;
