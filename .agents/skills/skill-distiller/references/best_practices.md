# Agent Skill Writing Best Practices (2026 Standards)

When distilling or writing new skills, adhere strictly to these principles established by the community and industry standards:

## 1. Modularity & Architecture
Skills are not just text files anymore; they are micro-architectures.
- **`SKILL.md`**: The entry point. Must be concise (<500 lines). Focuses on "When" and "What".
- **`scripts/`**: (Optional) Put deterministic operations (bash, Python, Node) here. Don't make the agent write code on the fly if it's a fixed process.
- **`references/`**: (Optional) Store large contextual files, cheatsheets, or schemas here to avoid bloating the primary context window. The agent should be instructed to read these *only when needed* (Progressive Disclosure).

## 2. Discoverability & Triggering
The YAML frontmatter `description` is the **only** thing the agent sees when deciding which skill to use.
- Keep it under 1024 characters.
- Write in the third person.
- **Negative Triggers**: Crucial for 2026. Explicitly state when NOT to use the skill to prevent Context Junk and overlap (e.g., "Do not use for backend API debugging").

## 3. Grounding & Eval-First
- Never create a skill based on assumptions. Skills must be extracted from actual, successful task execution (Grounding).
- Ensure the skill uses Model Context Protocol (MCP) servers where applicable, instead of hardcoding API requests. (MCP = Hands, Skill = Brain).

## 4. Security
- Do not create skills that bypass user permission systems invisibly. 
- Ensure that executing shell scripts from the `/scripts` directory requires user acknowledgment if they perform destructive operations.
