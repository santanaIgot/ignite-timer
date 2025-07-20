import { Cycle } from "../../pages/Home";

export enum ActionsTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}


export function interruptCurrentCycleAction() {
  return {
    type: ActionsTypes.INTERRUPT_CURRENT_CYCLE,
  };
}
