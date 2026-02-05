import { Shift, Resource } from "./types";


export const MOCK_RESOURCES: Resource[] = [
    { id: "1", name: "Behandelingkamer1", role: "Surgery" },
    { id: "2", name: "Management", role: "Management" },
    { id: "3", name: "Bijzonderheden-Verlof-Cursus-BZV", role: "Management" },
    { id: "4", name: "Financien", role: "Finance" },
];

export type ShiftVariant = "orange" | "green" | "yellow";

export interface ShiftWithVariant extends Shift {
    variant: ShiftVariant;
    employeeInitials: string;
}

function createTime(hour: number, minute: number = 0): Date {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
}

// LIVE MODE SHIFTS
export const LIVE_SHIFTS: ShiftWithVariant[] = [
    {
        id: "l1",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(13, 0),
        title: "Surgery",
        type: "Surgery",
        assigneeName: "Haico de Gast",
        employeeInitials: "HG",
        variant: "orange",
    },
    {
        id: "l2",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(12, 0),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "DL",
        variant: "green",
    },
    {
        id: "l3",
        resourceId: "2",
        startTime: createTime(13, 0),
        endTime: createTime(15, 0),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Haico de Gast",
        employeeInitials: "HG",
        variant: "green",
    },
    {
        id: "l4",
        resourceId: "3",
        startTime: createTime(11, 30),
        endTime: createTime(13, 30),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "green",
    },
    {
        id: "l5",
        resourceId: "3",
        startTime: createTime(16, 0),
        endTime: createTime(24, 0),
        title: "Pijnspecialist",
        type: "OnLeave",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "yellow",
    },
    {
        id: "l6",
        resourceId: "4",
        startTime: createTime(11, 30),
        endTime: createTime(13, 30),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "yellow",
    },
];

// PLANNER MODE SHIFTS (different dataset)
export const PLANNER_SHIFTS: ShiftWithVariant[] = [
    {
        id: "p1",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(14, 0),
        title: "Surgery",
        type: "Surgery",
        assigneeName: "Haico de Gast",
        employeeInitials: "HG",
        variant: "orange",
    },
    {
        id: "p2",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(12, 0),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "DL",
        variant: "green",
    },
    {
        id: "p3",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(11, 45),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "yellow",
    },
    {
        id: "p4",
        resourceId: "1",
        startTime: createTime(11, 0),
        endTime: createTime(13, 0),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Haico de Gast",
        employeeInitials: "HG",
        variant: "orange",
    },
    {
        id: "p5",
        resourceId: "2",
        startTime: createTime(13, 0),
        endTime: createTime(15, 0),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Haico de Gast",
        employeeInitials: "HG",
        variant: "green",
    },
    {
        id: "p6",
        resourceId: "3",
        startTime: createTime(11, 30),
        endTime: createTime(13, 30),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "green",
    },
    {
        id: "p7",
        resourceId: "3",
        startTime: createTime(16, 0),
        endTime: createTime(22, 0),
        title: "Pijnspecialist",
        type: "OnLeave",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "yellow",
    },
    {
        id: "p8",
        resourceId: "4",
        startTime: createTime(11, 30),
        endTime: createTime(13, 30),
        title: "Pijnspecialist",
        type: "Consultation",
        assigneeName: "Diane Lane",
        employeeInitials: "HG",
        variant: "yellow",
    },
];

// Employee data for Roster Panel
export interface Employee {
    id: string;
    name: string;
    initials: string;
    totalHours: string;
    weeklyHours: string;
    leaveDates?: string;
    status: "available" | "on_leave";
    availableDays: { day: string; available: boolean }[];
}

export const MOCK_EMPLOYEES: Employee[] = [
    {
        id: "e1",
        name: "Elijah Oyin",
        initials: "EO",
        totalHours: "1158.0hrs",
        weeklyHours: "38.0hrs",
        leaveDates: "Jan 8 - Jan 15",
        status: "on_leave",
        availableDays: [
            { day: "m", available: true },
            { day: "di", available: true },
            { day: "w", available: true },
            { day: "do", available: false },
            { day: "vr", available: false },
        ],
    },
    {
        id: "e2",
        name: "Diane Lane",
        initials: "DL",
        totalHours: "1158.0hrs",
        weeklyHours: "38.0hrs",
        leaveDates: "Jan 12 - Jan 28",
        status: "on_leave",
        availableDays: [
            { day: "m", available: true },
            { day: "di", available: true },
            { day: "w", available: true },
            { day: "do", available: false },
            { day: "vr", available: false },
        ],
    },
    {
        id: "e3",
        name: "Haico De Gast",
        initials: "HG",
        totalHours: "1158.0hrs",
        weeklyHours: "38.0hrs",
        leaveDates: "Jan 2 - Jan 9",
        status: "on_leave",
        availableDays: [
            { day: "m", available: true },
            { day: "di", available: true },
            { day: "w", available: true },
            { day: "do", available: false },
            { day: "vr", available: false },
        ],
    },
];
