export type ViolationSeverity ="low"|"medium"|"high";

export type ViolationType =
 |"NO_FACE"
 |"MULTIPLE_FACES"
 |"PHONE_DETECTED"
 |"BOOK_DETECTED"
 |"LAPTOP_DETECTED"
 |"TABLET_DETECTED"
 |"PAPER_DETECTED"
 |"TAB_SWITCH"
 |"UNKNOWN_OBJECT";

export type ProctorActionType ="DEDUCT_MARKS"|"REDUCE_TIME"|"END_SESSION"|"WARN"|"DISMISS";

export type ProctorAction = {
 type: ProctorActionType;
 value?: number;
 reason: string;
 timestamp: number;
};

export type ViolationFlag = {
 id: string;
 timestamp: number;
 type: ViolationType;
 detail: string;
 severity: ViolationSeverity;
 confidence: number;
 acknowledged: boolean;
 action?: ProctorAction;
};

export const VIOLATION_LABEL: Record<ViolationType, string> = {
 NO_FACE:"No face",
 MULTIPLE_FACES:"Multiple faces",
 PHONE_DETECTED:"Phone",
 BOOK_DETECTED:"Book",
 LAPTOP_DETECTED:"Laptop",
 TABLET_DETECTED:"Tablet",
 PAPER_DETECTED:"Paper",
 TAB_SWITCH:"Tab switch",
 UNKNOWN_OBJECT:"Object",
};

export const SEVERITY_COLOR = {
 low:"bg-yellow-500",
 medium:"bg-orange-500",
 high:"bg-red-500",
} as const;
