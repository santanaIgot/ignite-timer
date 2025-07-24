import { Cycle } from "../../pages/Home";
import { ActionsTypes } from "./actions";
import {produce} from 'immer'


interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}




export function cyclesReducer(state: CycleState, action: any){
      console.log("Valor da variável cycles", state);
      console.log("Conteúdo do dispatch", action);

      switch (action.type) {
        case ActionsTypes.ADD_NEW_CYCLE:
          // return {
          //   ...state,
          //   cycles: [...state.cycles, action.payload.newCycle],
          //   activeCycleId: action.payload.newCycle.id,
          // };
          return produce(state, draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
          })
        case ActionsTypes.INTERRUPT_CURRENT_CYCLE:
          // return {
          //   ...state,
          //   cycles: state.cycles.map((cycle) => {
          //     if (cycle.id == state.activeCycleId) {
          //       return { ...cycle, interruptDate: new Date() };
          //     } else {
          //       return cycle;
          //     }
          //   }),

          //   activeCycleId: null,
          // };


          const currentCycleIndex = state.cycles.findIndex(cycle => {
            return cycle.id == state.activeCycleId
          }) 

          if(currentCycleIndex < 0){
            return state

          }
          return produce(state, draft => {
            draft.activeCycleId = null;
            draft.cycles[currentCycleIndex].interruptedDate
          })
        default:
          return state;
      }
    }