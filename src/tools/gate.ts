/** Destructive Salesforce ops that require a prior ask_user confirmation. */
const DESTRUCTIVE_OPS = new Set([
  'sf_deploy_start',
  'sf_scratch_create',
  'sf_assign_permset',
]);

const CONFIRMATION_WITHIN_TURNS = 3;

export interface ToolCallRecord {
  toolName: string;
  callId: string;
  turnIndex: number;
}

export class DestructiveOpGate {
  private history: ToolCallRecord[];

  constructor(history: ToolCallRecord[] = []) {
    this.history = [...history];
  }

  /** Throw if a destructive op lacks a recent ask_user confirmation. */
  check(toolName: string, currentTurn = 0): void {
    if (!DESTRUCTIVE_OPS.has(toolName)) return;

    const recent = this.history.some(
      (r) =>
        r.toolName === 'ask_user' &&
        currentTurn - r.turnIndex <= CONFIRMATION_WITHIN_TURNS,
    );

    if (!recent) {
      throw new Error(
        `"${toolName}" is a destructive operation and requires prior ask_user confirmation within ${CONFIRMATION_WITHIN_TURNS} turns.`,
      );
    }
  }

  /** Record a tool call for future gate checks. */
  record(toolName: string, callId: string, turnIndex: number): void {
    this.history.push({ toolName, callId, turnIndex });
  }
}
