export interface StepRequirementsProps {
  step: number;
  requiredFields: string[];
}

export const StepRequirements = [
  {
    step: 0,
    requiredFields: ['firstname', 'lastname'],
  },
  {
    step: 1,
    requiredFields: ['age', 'gender'],
  },
  {
    step: 2,
    requiredFields: ['preference', 'lookingfor'],
  },
  {
    step: 3,
    requiredFields: ['location'],
  },
  {
    step: 4,
    requiredFields: ['profilepic'],
  },
  {
    step: 5,
    requiredFields: ['about'],
  },
  {
    step: 6,
    requiredFields: [''],
  },
];
