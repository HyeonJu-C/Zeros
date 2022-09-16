import { differenceInDays } from "date-fns";
import GoalPresenter from "../goal-presenter";

describe("goal presenter", () => {
  let goalPresenter: GoalPresenter;
  beforeEach(() => {
    goalPresenter = new GoalPresenter();
  });

  describe("formatGoalDate", () => {
    const date = new Date(2022, 8, 15);
    const stringifiedDate = JSON.stringify(date);

    it("should call parseGoalDate", () => {
      const spy = jest.spyOn(goalPresenter, "parseGoalDate");
      goalPresenter.formatGoalDate(stringifiedDate);

      expect(spy).toBeCalledTimes(1);
    });

    it("should format input date to 'yyyy년 MM월 dd일'", () => {
      const formattedDate = goalPresenter.formatGoalDate(stringifiedDate);

      expect(formattedDate).toBe("2022년 09월 15일");
    });
  });

  describe("formatAcheiveRate", () => {
    it("should call calculateAcheiveRate", () => {
      const spy = jest.spyOn(goalPresenter, "calculateAcheiveRate");
      goalPresenter.formatAcheiveRate(
        [{ date: JSON.stringify(new Date()), money: 100000 }],
        1000000
      );

      expect(spy).toBeCalledTimes(1);
    });

    it("should format value to 100 when the goal is achieved", () => {
      const formattedRate = goalPresenter.formatAcheiveRate(
        [{ date: JSON.stringify(new Date()), money: 1000000 }],
        1000000
      );

      expect(formattedRate).toBe(100);
    });

    it("should format value to 'nn.n' when the input is not integer", () => {
      const formattedRate = goalPresenter.formatAcheiveRate(
        [{ date: JSON.stringify(new Date()), money: 145343 }],
        1000000
      );

      expect(formattedRate).toBe("14.5");
    });
  });

  describe("formatGoalTitle", () => {
    it("should format '열 다섯 글자가 넘어가는 제목입니다.' to '열 다섯 글자가 넘어가는 ...' because the length >= 15", () => {
      const formattedTitle = goalPresenter.formatGoalTitle(
        "열 다섯 글자가 넘어가는 제목입니다."
      );

      expect(formattedTitle).toBe("열 다섯 글자가 넘어가는 ...");
    });

    it("should not format 안녕하세요 because the length < 15", () => {
      const formattedTitle = goalPresenter.formatGoalTitle("안녕하세요");

      expect(formattedTitle).toBe("안녕하세요");
    });
  });

  describe("formatMoney", () => {
    it("should format 39820347 to '3,982만 347원' because 1만 원 <= money < 1억 원", () => {
      const formattedMoney = goalPresenter.formatMoney(39820347);

      expect(formattedMoney).toBe("3,982만 347원");
    });

    it("should format 5632412330 to '50억 6,324만 원' because  money >= 1억 원", () => {
      const formattedMoney = goalPresenter.formatMoney(5632412330);

      expect(formattedMoney).toBe("56억 3,241만 원");
    });

    it("should format 1234 to '1,234 원' because  money < 1만 원", () => {
      const formattedMoney = goalPresenter.formatMoney(1234);

      expect(formattedMoney).toBe("1,234 원");
    });
  });

  describe("calculateLeftDays", () => {
    it("should return difference in days between today and goalDate", () => {
      const goalDate = new Date(2022, 11, 31);
      const leftDays = goalPresenter.calculateLeftDays(
        JSON.stringify(goalDate)
      );

      expect(leftDays).toBe(differenceInDays(goalDate, new Date()));
    });

    it("should return '마감' when today >= goalDate", () => {
      const goalDate = new Date();
      const leftDays = goalPresenter.calculateLeftDays(
        JSON.stringify(goalDate)
      );

      expect(leftDays).toBe("마감");
    });

    it("should return NaN when given goal date isn't JSON.stringified.", () => {
      const goalDate = new Date(2022, 11, 31);
      const leftDays = goalPresenter.calculateLeftDays(goalDate.toString());

      expect(leftDays).toBeNaN();
    });
  });
});
