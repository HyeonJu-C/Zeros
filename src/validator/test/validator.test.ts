import Validator, { SizeOptions, LengthOptions } from "../validator";

describe("validator", () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });

  describe("validateLength", () => {
    it("should return is given value satisfied given options(minLength, maxLength)", () => {
      const options: LengthOptions = {
        type: "length",
        minLength: 3,
        maxLength: 20,
      };
      const result = validator.validateLength("hello, world!", options);

      expect(result).toBe(true);
    });
  });

  describe("validateSize", () => {
    it("should return is given value satisfied given options(min, max)", () => {
      const options: SizeOptions = {
        type: "size",
        min: 10000000,
        max: 100000000,
      };
      const result = validator.validateSize(1, options);

      expect(result).toBe(false);
    });
  });
});
