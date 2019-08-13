import {ID} from '@datorama/akita';

export interface IChoice<T = string> {
  id: ID;
  choice: T; // some choices may be number values

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
