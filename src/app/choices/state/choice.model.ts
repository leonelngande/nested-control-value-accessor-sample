export interface IChoice {
  id: number;
  choice: string; // some choices may be number values
  parent?: IChoice;

}

/**
 * A factory function that creates Choices
 */
export function createChoice(params: Partial<IChoice>): IChoice {
  return {
    id: params.id,
    choice: params.choice,
  };
}

export const choices: IChoice[] = [
  {id: 1, choice: 'Choice 1'},
  {id: 2, choice: 'Choice 2'},
  {id: 3, choice: 'Choice 3'},
  {id: 4, choice: 'Choice 4'},
  {id: 5, choice: 'Choice 5'},
  {id: 6, choice: 'Choice 6'},
  {id: 7, choice: 'Choice 7'},
  {id: 8, choice: 'Choice 8'},
  {id: 9, choice: 'Choice 9'},
  {id: 10, choice: 'Choice 10'},
  {id: 11, choice: 'Choice 11'},
  {id: 12, choice: 'Choice 12'},
];
