export interface Resource {
    id: string;
    name: string;
    role: string; // e.g. "Surgery", "Assistant"
    avatar?: string;
}

export type ShiftType = "Surgery" | "Consultation" | "OnLeave" | "Management";

export interface Shift {
    id: string;
    resourceId: string;
    startTime: Date;
    endTime: Date;
    title: string; // e.g. "Surgery"
    subtitle?: string; // e.g. "Cholecystectomy"
    type: ShiftType;
    assigneeName?: string;
}

export interface SchedulerState {
    currentDate: Date;
    resources: Resource[];
    shifts: Shift[];
}

export type Action =
    | { type: "SET_DATE"; payload: Date }
    | { type: "ADD_SHIFT"; payload: Shift }
    | { type: "MOVE_SHIFT"; payload: { id: string; newResourceId: string; newStartTime: Date } };
