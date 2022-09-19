export interface LengthOptions {
  type: "length";
  minLength: number;
  maxLength: number;
}

export interface SizeOptions {
  type: "size";
  min: number;
  max: number;
}

export type Validate = (
  value: number | string | null,
  options: LengthOptions | SizeOptions
) => boolean;

export default class Validator {
  value: number | string | null;

  options: LengthOptions | SizeOptions | null;

  isValid: boolean | null;

  constructor() {
    this.value = null;
    this.options = null;
    this.isValid = null;
  }

  validateLength(value: string, options: LengthOptions) {
    this.value = value;
    this.options = options;

    const { minLength, maxLength } = options;
    this.isValid =
      this.value.length >= minLength && this.value.length <= maxLength;
    return this.isValid;
  }

  validateSize(value: number, options: SizeOptions) {
    this.value = value;
    this.options = options;

    const { min, max } = options;
    this.isValid = this.value >= min && this.value <= max;
    return this.isValid;
  }
}
