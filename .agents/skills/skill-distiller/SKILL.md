---
name: skill-distiller
description: "Analyzes past conversation transcripts to automatically extract successful workflows and generate new Agent Skills. Use when requested to distill a conversation into a skill or to formalize a repetitive task. Do NOT use this skill for code debugging or general refactoring."
---

# Skill Distiller

This skill instructs the agent to act as a "Skill Engineer", analyzing past successes and encoding them into modular, high-quality Agent Skills according to 2026 standards.

## Execution Workflow

1. **Extract Transcript Data:**
   Use the provided conversation link (e.g., `@[conversation:"Title"]`) or current context to identify the conversation ID.
   Read the transcript using PowerShell or file parsing (e.g., `transcript.jsonl`) to identify User Inputs and Planner Responses.

2. **Identify Patterns:**
   Look for:
   - Repetitive corrections from the user.
   - Successful solutions to complex roadblocks.
   - Established design patterns or workflows that were agreed upon.

3. **Read 2026 Best Practices:**
   Before drafting the new skill, you MUST read the guidelines located in:
   [references/best_practices.md](references/best_practices.md)

4. **Draft the Modular Skill:**
   Create the skill in the appropriate `.agents/skills/<skill-name>` folder.
   - **`SKILL.md`**: Must contain precise YAML frontmatter (with negative triggers in description) and be under 500 lines.
   - **`/scripts`**: (Optional) For deterministic operations, create shell/Python/Node scripts that the agent can execute.
   - **`/references`**: (Optional) For large context like cheatsheets, schemas, or extended documentation.

5. **Review with User:**
   Present the scaffolded skill to the user. Explain how the description was optimized to avoid "Context Junk" and ensure discoverability.
