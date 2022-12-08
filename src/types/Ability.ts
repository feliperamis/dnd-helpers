export type Ability = {
  maxSlots: number;
  slots: boolean[];
};

export type AbilityList = {
  [id: string]: Ability;
};
