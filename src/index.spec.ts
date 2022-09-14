// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { areAnswersCorrect, PossibleAnswers, UserAnswers } from "./domain";

expect.extend(matchers);

describe("Quizz Logic", () => {
  it("If no questions are selected should be badly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = [];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        questionId: "1",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If one valid question is selected should be correctly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = ["1"];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        questionId: "1",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(true);
  });

  it("If one selected question is wrong, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = ["1"];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        questionId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        questionId: "2",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If multiple selected question is are correct and corresponding, should be correctly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = ["3", "2"];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        questionId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        questionId: "2",
      },
      {
        isValid: true,
        message: "Answer 3",
        questionId: "3",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(true);
  });

  it("If one selected question is wrong and the others are correct, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = ["1", "3", "2"];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: false,
        message: "Answer 1",
        questionId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        questionId: "2",
      },
      {
        isValid: true,
        message: "Answer 3",
        questionId: "3",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });

  it("If one correct question is missing, should be badly answered", () => {
    /* GIVEN */
    const userAnswers: UserAnswers = ["1"];
    const possibleAnswers: PossibleAnswers = [
      {
        isValid: true,
        message: "Answer 1",
        questionId: "1",
      },
      {
        isValid: true,
        message: "Answer 2",
        questionId: "2",
      },
    ];

    /* WHEN */
    const isQuestionAnsweredCorrectly = areAnswersCorrect({ userAnswers, possibleAnswers });

    /* THEN */
    expect(isQuestionAnsweredCorrectly).toEqual(false);
  });
});
