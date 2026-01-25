export type FormFieldTypes<S = any> = {
  text: string;
  checkbox: boolean;
  select: S;
  object: S;
  file: File[];
};

export type InputField<T extends keyof FormFieldTypes<S>, S = any> = {
  name: string;
  placeholder?: string;
  type: T;
  value: FormFieldTypes<S>[T];
  state: formFieldStateType;
};

export type FormInputs<T extends Record<string, InputField<keyof FormFieldTypes<S>, S>>, S = any> = {
  [K in keyof T]: T[K];
};

export type formFieldStateType = {
  isValid: boolean;
  errors: string[];
};

export type formFieldsStateType<fields extends string | number | symbol> = {
  [field in fields]: formFieldStateType;
};

export type fieldValidationRule =
  | {
      type: "REGEX";
      value: RegExp;
      error: string;
    }
  | {
      type: "NOT_EMPTY";
      error: string;
    }
  | {
      type: "NOT_NULL";
      error: string;
    }
  | {
      type: "DEPENDS";
      value: string;
    }
  | {
      type: "IS_TRUE";
      error: string;
    }
  | {
      type: "SAME_AS";
      value: string;
      error: string;
    }
  | {
      type: "DISABLE_RULES_IF_FALSE";
      value: string;
      error: string;
    }
  | {
      type: "LENGTH_BIGGER_EQUAL_THAN";
      value: number;
      error: string;
    }
  | {
      type: "NUMBER_BIGGER_EQUAL_THAN";
      value: number;
      error: string;
    };

export type fieldValidationRules<fields extends string | number | symbol> = {
  [field in fields]: fieldValidationRule[];
};
