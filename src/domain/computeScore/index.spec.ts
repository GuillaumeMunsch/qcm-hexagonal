// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { areAnswersCorrect, computeScore, PossibleAnswers, QuestionAnswer, QuizzAnswer } from ".";
import { Quizz } from "../initializeQuizz";

expect.extend(matchers);

describe("Quizz Logic", () => {
  it("If no questions are selected should be badly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: [],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        answerId: "1",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If one valid question is selected should be correctly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: ["1"],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        answerId: "1",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(true);
  });

  it("If one selected question is wrong, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: ["1"],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        answerId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        answerId: "2",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If multiple selected question is are correct and corresponding, should be correctly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: ["3", "2"],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        answerId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        answerId: "2",
      },
      {
        isValid: true,
        message: "Answer 3",
        answerId: "3",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(true);
  });

  it("If one selected question is wrong and the others are correct, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: ["1", "3", "2"],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        answerId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        answerId: "2",
      },
      {
        isValid: true,
        message: "Answer 3",
        answerId: "3",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If one correct question is missing, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: QuestionAnswer = {
      questionId: "1",
      selectedAnswersId: ["1"],
    };
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        answerId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        answerId: "2",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });
});

describe("Compute Score", () => {
  it("", () => {
    /* GIVEN */
    const quizz: Quizz = {
      name: "very hard quizz",
      questions: [
        {
          id: "1",
          questionMessage: "question 1",
          possibleAnswers: [
            {
              isValid: false,
              message: "reponse 1",
              answerId: "1",
            },
            {
              isValid: true,
              message: "reponse 2",
              answerId: "2",
            },
          ],
        },
      ],
    };
    const userQuizzSubmition: QuizzAnswer = {
      questionAnswers: [
        {
          questionId: "1",
          selectedAnswersId: ["1"],
        },
      ],
    };

    /* WHEN */
    const quizzScore = computeScore(quizz, userQuizzSubmition);
    /* THEN */
    expect(quizzScore).toEqual({
      numberOfCorrectQuestions: 0,
      numberOfQuestions: 1,
    });
  });

  it("", () => {
    /* GIVEN */
    const quizz: Quizz = {
      name: "very hard quizz",
      questions: [
        {
          id: "1",
          questionMessage: "question 1",
          possibleAnswers: [
            {
              isValid: false,
              message: "reponse 1",
              answerId: "1",
            },
            {
              isValid: true,
              message: "reponse 2",
              answerId: "2",
            },
          ],
        },
      ],
    };
    const userQuizzSubmition: QuizzAnswer = {
      questionAnswers: [
        {
          questionId: "1",
          selectedAnswersId: ["2"],
        },
      ],
    };

    /* WHEN */
    const quizzScore = computeScore(quizz, userQuizzSubmition);
    /* THEN */
    expect(quizzScore).toEqual({
      numberOfCorrectQuestions: 1,
      numberOfQuestions: 1,
    });
  });
  it("", () => {
    /* GIVEN */
    const quizz: Quizz = {
      name: "very hard quizz",
      questions: [
        {
          id: "1",
          questionMessage: "question 1",
          possibleAnswers: [
            {
              isValid: true,
              message: "reponse 1",
              answerId: "1",
            },
            {
              isValid: true,
              message: "reponse 2",
              answerId: "2",
            },
          ],
        },
      ],
    };
    const userQuizzSubmition: QuizzAnswer = {
      questionAnswers: [
        {
          questionId: "1",
          selectedAnswersId: ["1", "2"],
        },
      ],
    };

    /* WHEN */
    const quizzScore = computeScore(quizz, userQuizzSubmition);
    /* THEN */
    expect(quizzScore).toEqual({
      numberOfCorrectQuestions: 1,
      numberOfQuestions: 1,
    });
  });

  it("", () => {
    /* GIVEN */
    const quizz: Quizz = {
      name: "very hard quizz",
      questions: [
        {
          id: "1",
          questionMessage: "question 1",
          possibleAnswers: [
            {
              isValid: false,
              message: "reponse 1",
              answerId: "1",
            },
            {
              isValid: true,
              message: "reponse 2",
              answerId: "2",
            },
          ],
        },
        {
          id: "2",
          questionMessage: "question 2",
          possibleAnswers: [
            {
              isValid: false,
              message: "reponse 1",
              answerId: "1",
            },
            {
              isValid: true,
              message: "reponse 2",
              answerId: "2",
            },
          ],
        },
      ],
    };
    const userQuizzSubmition: QuizzAnswer = {
      questionAnswers: [
        {
          questionId: "1",
          selectedAnswersId: ["1"],
        },
        {
          questionId: "2",
          selectedAnswersId: ["1"],
        },
      ],
    };

    /* WHEN */
    const quizzScore = computeScore(quizz, userQuizzSubmition);
    /* THEN */
    expect(quizzScore).toEqual({
      numberOfCorrectQuestions: 0,
      numberOfQuestions: 2,
    });
  });
});
