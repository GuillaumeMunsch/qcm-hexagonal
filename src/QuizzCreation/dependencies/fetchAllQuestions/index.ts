import { PossibleAnswers, Question } from "../../../QuizzScoring/domain/computeScore";

const generateRandomNumber = ({ max, min }: { max: number; min: number }) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generatePossibleAnswers = (questionId: string): PossibleAnswers => {
  const numberOfAnswers = generateRandomNumber({ max: 4, min: 2 });

  return [...new Array(numberOfAnswers)].map((_, index): PossibleAnswers[number] => ({
    isValid: index === 0 ? true : (Math.random() - 0, 5 >= 0),
    message: `This is answer number ${index + 1}`,
    answerId: questionId,
  }));
};

const fetchAllQuestions = (): Question[] => {
  const questions = [...new Array(90)].map(
    (elem, index): Question => ({
      id: `${index}`,
      questionMessage: `Question number ${index + 1}`,
      possibleAnswers: generatePossibleAnswers(`${index}`),
    })
  );
  return questions;
};

export default fetchAllQuestions;
