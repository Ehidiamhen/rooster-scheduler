"use client"

import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react"
import { SchedulerState, Action, Shift, Resource } from "@/lib/types"

export type ViewMode = "live" | "planner";

interface ExtendedSchedulerState extends SchedulerState {
    viewMode: ViewMode;
    isRosterOpen: boolean;
}

const initialState: ExtendedSchedulerState = {
    currentDate: new Date(),
    viewMode: "live",
    isRosterOpen: false,
    resources: [],
    shifts: []
};

type ExtendedAction = Action | { type: "SET_VIEW_MODE"; payload: ViewMode } | { type: "TOGGLE_ROSTER" } | { type: "SET_ROSTER_OPEN"; payload: boolean };

const schedulerReducer = (state: ExtendedSchedulerState, action: ExtendedAction): ExtendedSchedulerState => {
    switch (action.type) {
        case "SET_DATE":
            return { ...state, currentDate: action.payload };
        case "SET_VIEW_MODE":
            return { ...state, viewMode: action.payload };
        case "TOGGLE_ROSTER":
            return { ...state, isRosterOpen: !state.isRosterOpen };
        case "SET_ROSTER_OPEN":
            return { ...state, isRosterOpen: action.payload };
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
    isRosterOpen: boolean;
    setDate: (date: Date) => void;
    setViewMode: (mode: ViewMode) => void;
    toggleRoster: () => void;
    setRosterOpen: (open: boolean) => void;
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
        isRosterOpen: state.isRosterOpen,
        setDate: (date: Date) => dispatch({ type: "SET_DATE", payload: date }),
        setViewMode: (mode: ViewMode) => dispatch({ type: "SET_VIEW_MODE", payload: mode }),
        toggleRoster: () => dispatch({ type: "TOGGLE_ROSTER" }),
        setRosterOpen: (open: boolean) => dispatch({ type: "SET_ROSTER_OPEN", payload: open }),
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
