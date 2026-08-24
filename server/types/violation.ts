export type ViolationSeverity = "low" | "medium" | "high";

export type ViolationType =
  | "NO_FACE"
  | "MULTIPLE_FACES"
  | "PHONE_DETECTED"
  | "BOOK_DETECTED"
  | "LAPTOP_DETECTED"
  | "TABLET_DETECTED"
  | "PAPER_DETECTED"
  | "TAB_SWITCH"
  | "UNKNOWN_OBJECT";

export type ProctorActionType = "DEDUCT_MARKS" | "REDUCE_TIME" | "END_SESSION" | "WARN" | "DISMISS";

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

export const MAX_VIOLATION_FLAGS = 200;
