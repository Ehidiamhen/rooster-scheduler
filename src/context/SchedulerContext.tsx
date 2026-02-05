"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { SchedulerState, Action, Shift, Resource } from "@/lib/types"

const initialState: SchedulerState = {
    currentDate: new Date(),
    resources: [],
    shifts: []
};

const schedulerReducer = (state: SchedulerState, action: Action): SchedulerState => {
    switch (action.type) {
        case "SET_DATE":
            return { ...state, currentDate: action.payload };
        case "ADD_SHIFT":
            return { ...state, shifts: [...state.shifts, action.payload] };
        case "MOVE_SHIFT": {
            const { id, newResourceId, newStartTime } = action.payload;
            return {
                ...state,
                shifts: state.shifts.map(shift =>
                    shift.id === id
                        ? { ...shift, resourceId: newResourceId, startTime: newStartTime }
                        : shift
                )
            };
        }
        default:
            return state;
    }
};

const SchedulerContext = createContext<{
    state: SchedulerState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const SchedulerProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(schedulerReducer, initialState);

    return (
        <SchedulerContext.Provider value={{ state, dispatch }}>
            {children}
        </SchedulerContext.Provider>
    );
};

export const useScheduler = () => {
    const context = useContext(SchedulerContext);
    if (!context) {
        throw new Error("useScheduler must be used within a SchedulerProvider");
    }
    return context;
};
