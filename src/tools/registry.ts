import type { Tool, ToolContext } from '~/tools/types';
import { buildCachedToolDefs } from '~/agent/cache-hints';

export class ToolRegistry {
  private readonly tools = new Map<string, Tool>();

  registerTool(tool: Tool): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool "${tool.name}" already registered`);
    }
    this.tools.set(tool.name, tool);
  }

  listTools(): Tool[] {
    return [...this.tools.values()];
  }

  getTool(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  async executeTool(name: string, rawArgs: unknown, ctx: ToolContext): Promise<unknown> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Unknown tool: "${name}"`);
    const args = tool.parameters.parse(rawArgs);
    return tool.execute(args, ctx);
  }

  /** Produce Anthropic-compatible tool definitions (with cache hints). */
  toAnthropicTools() {
    return buildCachedToolDefs(this.listTools());
  }
}
