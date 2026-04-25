import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';

export type { MessageParam };

// All event kinds emitted by AgentLoop and consumed by Chat.tsx.
export type AgentEventKind =
  // Main loop events
  | 'turn:thinking'   // after send, before first delta
  | 'turn:stream'     // first text delta arrived
  | 'turn:done'       // loop finished (no more tool calls)
  // Tool lifecycle
  | 'tool:pending'    // tool call parsed, dispatch about to start
  | 'tool:running'    // execute() called
  | 'tool:done'       // execute() resolved
  | 'tool:error'      // execute() threw
  // Subagent handoff events (H1 — Managed Agents prize observability)
  | 'subagent:spawn'   // isolated subagent is starting (reviewer, qa, etc.)
  | 'subagent:stream'  // subagent streaming a message
  | 'subagent:tool'    // subagent executing a tool
  | 'subagent:result'; // subagent returned final result

export interface AgentEventMap {
  'turn:thinking': [];
  'turn:stream': [text: string];
  'turn:done': [finalText: string];
  'tool:pending': [callId: string, toolName: string, input: unknown];
  'tool:running': [callId: string, toolName: string];
  'tool:done': [callId: string, toolName: string, result: unknown];
  'tool:error': [callId: string, toolName: string, error: string];
  'subagent:spawn': [agentName: string, model: string];
  'subagent:stream': [agentName: string, text: string];
  'subagent:tool': [agentName: string, toolName: string];
  'subagent:result': [agentName: string, result: unknown];
}

export interface TokenUsageTurn {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
}
