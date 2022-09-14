import { Quizz, QuizzInitializedEvent, reactToEvent } from "./subscriber";

describe("QuizzScoring subscriber", () => {
  it("return the quizz with the correct format", () => {
    /* GIVEN */
    const event: QuizzInitializedEvent = {
      type: "QuizzInitialized",
      payload: {
        name: "1",
        questions: [
          {
            id: "1",
            questionMessage: "combien?",
            possibleAnswers: [
              { answerId: "1", isValid: true, message: "42" },
              { answerId: "2", isValid: true, message: "43" },
            ],
          },
        ],
      },
    };

    /* WHEN */
    const result = reactToEvent(event);

    /* THEN */
    const expected: Quizz = {
      name: "1",
      questions: [{ id: "1", validAnswerIds: ["1", "2"] }],
    };
    expect(result).toEqual(expected);
  });
  it("return the quizz with the correct format", () => {
    /* GIVEN */
    const event: QuizzInitializedEvent = {
      type: "QuizzInitialized",
      payload: {
        name: "1",
        questions: [
          {
            id: "1",
            questionMessage: "combien?",
            possibleAnswers: [
              { answerId: "1", isValid: true, message: "42" },
              { answerId: "2", isValid: false, message: "43" },
            ],
          },
          {
            id: "2",
            questionMessage: "combien de?",
            possibleAnswers: [
              { answerId: "1", isValid: true, message: "42" },
              { answerId: "2", isValid: true, message: "43" },
            ],
          },
        ],
      },
    };

    /* WHEN */
    const result = reactToEvent(event);

    /* THEN */
    const expected: Quizz = {
      name: "1",
      questions: [
        { id: "1", validAnswerIds: ["1"] },
        { id: "2", validAnswerIds: ["1", "2"] },
      ],
    };
    expect(result).toEqual(expected);
  });
});
