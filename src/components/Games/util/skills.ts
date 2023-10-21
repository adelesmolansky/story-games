export enum COUNTING_SKILLS {
  CARDINALITY = 'cardinality', // DONE
  ABSTRACTION = 'abstraction', // DONE
  COUNT_FORWARDS = 'count forwards',
  COUNT_BACKWARDS = 'count backwards',
}

export enum ADDITION_SKILLS {
  ADD_OBJECTS = 'add objects', // DONE
  ADD_NUMBERS = 'add numbers', // DONE
  VISUAL_WORD_PROBLEMS = 'visual word problems',
  NUMERIC_WORD_PROBLEMS = 'numeric word problems',
}

export enum SUBTRACTION_SKILLS {
  SUBTRACT_OBJECTS = 'subtract objects', // DONE
  SUBTRACT_NUMBERS = 'subtract numbers', // DONE
  VISUAL_WORD_PROBLEMS = 'visual word problems',
  NUMERIC_WORD_PROBLEMS = 'numeric word problems',
}

export enum COMPARISON_SKILLS {
  COMPARE_OBJECTS = 'compare objects', // DONE
  COMPARE_NUMBERS = 'compare numbers', // DONE
  VISUAL_WORD_PROBLEMS = 'visual word problems',
  NUMERIC_WORD_PROBLEMS = 'numeric word problems',
  COMPARISON_SIGNS = 'comparison signs',
}

export type ALL_SKILLS =
  | COUNTING_SKILLS
  | ADDITION_SKILLS
  | SUBTRACTION_SKILLS
  | COMPARISON_SKILLS;
