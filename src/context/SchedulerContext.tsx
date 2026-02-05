"use client"

import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react"
import { SchedulerState, Action, Shift, Resource } from "@/lib/types"

export type ViewMode = "live" | "planner";

interface ExtendedSchedulerState extends SchedulerState {
    viewMode: ViewMode;
}

const initialState: ExtendedSchedulerState = {
    currentDate: new Date(),
    viewMode: "live",
    resources: [],
    shifts: []
};

type ExtendedAction = Action | { type: "SET_VIEW_MODE"; payload: ViewMode };

const schedulerReducer = (state: ExtendedSchedulerState, action: ExtendedAction): ExtendedSchedulerState => {
    switch (action.type) {
        case "SET_DATE":
            return { ...state, currentDate: action.payload };
        case "SET_VIEW_MODE":
            return { ...state, viewMode: action.payload };
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

interface SchedulerContextValue {
    state: ExtendedSchedulerState;
    dispatch: React.Dispatch<ExtendedAction>;
    // Convenience helpers
    currentDate: Date;
    viewMode: ViewMode;
    isLive: boolean;
    setDate: (date: Date) => void;
    setViewMode: (mode: ViewMode) => void;
    goToPrevDay: () => void;
    goToNextDay: () => void;
    goToToday: () => void;
}

const SchedulerContext = createContext<SchedulerContextValue | undefined>(undefined);

export const SchedulerProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(schedulerReducer, initialState);

    const value = useMemo<SchedulerContextValue>(() => ({
        state,
        dispatch,
        // Convenience helpers
        currentDate: state.currentDate,
        viewMode: state.viewMode,
        isLive: state.viewMode === "live",
        setDate: (date: Date) => dispatch({ type: "SET_DATE", payload: date }),
        setViewMode: (mode: ViewMode) => dispatch({ type: "SET_VIEW_MODE", payload: mode }),
        goToPrevDay: () => dispatch({
            type: "SET_DATE",
            payload: new Date(state.currentDate.getTime() - 24 * 60 * 60 * 1000)
        }),
        goToNextDay: () => dispatch({
            type: "SET_DATE",
            payload: new Date(state.currentDate.getTime() + 24 * 60 * 60 * 1000)
        }),
        goToToday: () => dispatch({ type: "SET_DATE", payload: new Date() }),
    }), [state]);

    return (
        <SchedulerContext.Provider value={value}>
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
