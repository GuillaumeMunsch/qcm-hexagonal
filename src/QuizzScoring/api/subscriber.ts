import {
  Quizz as QuizzFromQuizzCreation,
  Question as QuestionFromQuizzCreation,
} from "../../QuizzCreation/domain/initializeQuizz";

export type Question = {
  id: string;
  validAnswerIds: string[];
};

export type Quizz = {
  name: string;
  questions: Question[];
};

export type QuizzInitializedEvent = {
  type: "QuizzInitialized";
  payload: QuizzFromQuizzCreation;
};

const extractValidAnswersForQuestion = (question: QuestionFromQuizzCreation): Question => {
  const validAnswerIds = question.possibleAnswers.filter((answer) => answer.isValid).map((answer) => answer.answerId);
  return {
    validAnswerIds,
    id: question.id,
  };
};

export const reactToEvent = ({ payload }: QuizzInitializedEvent) => {
  return {
    name: payload.name,
    questions: payload.questions.map(extractValidAnswersForQuestion),
  };
};
