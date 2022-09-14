import { Question } from "../computeScore";

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
