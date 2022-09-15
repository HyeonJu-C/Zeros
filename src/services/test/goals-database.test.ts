import StubGoalsService from "./stub-goals-data";

describe("goals database service", () => {
  let goalsService: StubGoalsService;
  beforeEach(() => {
    goalsService = new StubGoalsService();
  });

  describe("postGoal", () => {
    it("should post new goal", async () => {
      const result = await goalsService.postGoal({ goalTitle: "title" });
      expect(result).toMatch("새로운 목표 post 성공");
    });

    it("should throw Error if goal value is falsy", async () => {
      try {
        await goalsService.postGoal(null);
      } catch (error) {
        expect(error).toMatch("새로운 목표 post 실패(empty data)");
      }
    });
  });

  describe("getGoals", () => {
    it("should get all goals data", async () => {
      const result = await goalsService.getGoals();
      expect(result).toMatch("목표 data 가져오기 성공");
    });

    it("should throw Error when errors occured", async () => {
      try {
        await goalsService.getGoals("error");
      } catch (error) {
        expect(error).toMatch("목표 data 가져오기 실패");
      }
    });
  });

  describe("getGoalById", () => {
    it("should get goal data by id", async () => {
      const result = await goalsService.getGoalById("goalId");
      expect(result).toMatch("id로 목표 data 가져오기 성공");
    });

    it("should throw Error when id value is falsy", async () => {
      try {
        await goalsService.getGoalById(null);
      } catch (error) {
        expect(error).toMatch("id로 목표 data 가져오기 실패");
      }
    });
  });

  describe("getGoalsByUserId", () => {
    it("should get goal data by userId", async () => {
      const result = await goalsService.getGoalsByUserId("userId");
      expect(result).toMatch("userId로 목표 data 가져오기 성공");
    });

    it("should throw Error when userId value is falsy", async () => {
      try {
        await goalsService.getGoalsByUserId(null);
      } catch (error) {
        expect(error).toMatch("userId로 목표 data 가져오기 실패");
      }
    });
  });

  describe("deleteGoalById", () => {
    it("should delete goal data by goalId", async () => {
      const result = await goalsService.deleteGoalById("goalId");
      expect(result).toMatch("id로 목표 삭제하기 성공");
    });

    it("should throw Error when goalId value is falsy", async () => {
      try {
        await goalsService.deleteGoalById(null);
      } catch (error) {
        expect(error).toMatch("id로 목표 삭제하기 실패");
      }
    });
  });

  describe("patchGoalById", () => {
    it("should update goal data by goalId", async () => {
      const result = await goalsService.patchGoalById(
        { goalTitle: "patched" },
        "goalId"
      );
      expect(result).toMatch("id로 목표 수정하기 성공");
    });

    it("should throw Error when goalId value is falsy", async () => {
      try {
        await goalsService.patchGoalById({ goalTitle: "patch" }, null);
      } catch (error) {
        expect(error).toMatch("id로 목표 수정하기 실패(empty id)");
      }
    });

    it("should throw Error when data value is falsy", async () => {
      try {
        await goalsService.patchGoalById(null, "goalId");
      } catch (error) {
        expect(error).toMatch("id로 목표 수정하기 실패(empty data)");
      }
    });
  });

  describe("saveMoneyById", () => {
    it("should update saved money data by goalId", async () => {
      const result = await goalsService.saveMoneyById(
        { date: JSON.stringify(new Date()), money: 1 },
        "goalId"
      );
      expect(result).toMatch("id로 저축하기 성공");
    });

    it("should throw Error when goalId value is falsy", async () => {
      try {
        await goalsService.saveMoneyById(
          { date: JSON.stringify(new Date()), money: 1 },
          null
        );
      } catch (error) {
        expect(error).toMatch("id로 저축하기 실패(empty id)");
      }
    });

    it("should throw Error when money value is falsy", async () => {
      try {
        await goalsService.saveMoneyById(null, "goalId");
      } catch (error) {
        expect(error).toMatch("id로 저축하기 실패(empty money)");
      }
    });
  });
});
