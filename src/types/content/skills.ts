/**
 * Type definitions for skills and skill configs
 */

/**
 * An enumeration of possible skill types
 */
export enum SkillType {
	Languages = 'languages',
	Technologies = 'technologies',
	Tools = 'tools',
	Topics = 'topics',
}

/**
 * A union of string literals representing all language skills
 */
export type LanguageSkill =
	| 'Bash'
	| 'C/C++'
	| 'CSS'
	| 'Datalog'
	| 'GraphQL'
	| 'HTML'
	| 'Java'
	| 'JavaScript/TypeScript'
	| 'JSX/TSX'
	| 'Kotlin'
	| 'Liquid Template Language'
	| 'Lisp'
	| 'Lua'
	| 'MIPS Assembly'
	| 'Nix'
	| 'Python'
	| 'R'
	| 'Regular Expressions'
	| 'SASS/SCSS'
	| 'SQL'
	| 'VBA';

/**
 * A union of string literals representing all technology skills
 */
export type TechnologySkill =
	| 'Astro'
	| 'AVA'
	| 'Bun'
	| 'Cloudflare Workers'
	| 'CUDA'
	| 'Cypress'
	| 'Deno'
	| 'Django'
	| 'Docker'
	| 'Electron'
	| 'ESLint'
	| 'Express.js'
	| 'FastAPI'
	| 'Firebase'
	| 'GatsbyJS'
	| 'GitHub Actions'
	| 'Gradle'
	| 'Grafana'
	| 'Gulp'
	| 'Jekyll'
	| 'Jest'
	| 'Joi'
	| 'JSP'
	| 'JUnit'
	| 'Kubernetes'
	| 'Nano Stores'
	| 'Next.js'
	| 'Node.js'
	| 'NumPy'
	| 'Octokit'
	| 'OpenStack'
	| 'Oracle DB'
	| 'Parcel'
	| 'Pinia Colada'
	| 'Pinia'
	| 'Playwright'
	| 'PostCSS'
	| 'PostgreSQL'
	| 'Puppeteer'
	| 'React'
	| 'Selenium'
	| 'SolidJS'
	| 'SonarQube'
	| 'Spring Framework'
	| 'SQLite'
	| 'Tailwind CSS'
	| 'Vercel'
	| 'Vite'
	| 'Vitepress'
	| 'Vitest'
	| 'Vue I18n'
	| 'Vue'
	| 'VueUse'
	| 'Webpack'
	| 'Zod';

/**
 * A union of string literals representing all tool skills
 */
export type ToolSkill =
	| 'Android Studio'
	| 'Biome'
	| 'Blender'
	| 'ChatGPT'
	| 'Claude Code'
	| 'Claude Desktop'
	| 'Codex Desktop'
	| 'Codex Desktop'
	| 'Continue'
	| 'Dependabot'
	| 'ESLint'
	| 'Gemini'
	| 'GIMP'
	| 'Git'
	| 'GitHub Copilot'
	| 'GitHub'
	| 'GraphiQL'
	| 'Inkscape'
	| 'IntelliJ IDEA'
	| 'Jira'
	| 'Jupyter'
	| 'Linux'
	| 'Oxfmt'
	| 'Oxlint'
	| 'Postman'
	| 'Prettier'
	| 'Slack'
	| 'VS Code'
	| 'Visual Studio';

/**
 * A union of string literals representing all topic skills
 */
export type TopicSkill =
	| 'Accessibility'
	| 'Agile Methodologies'
	| 'AI-Assisted Development'
	| 'Asynchronous Communication'
	| 'Automated Releases'
	| 'Automated Testing'
	| 'Branding'
	| 'CI/CD'
	| 'Cloud Computing'
	| 'Code Review'
	| 'Component Design'
	| 'Containerization'
	| 'Cross-Functional Collaboration'
	| 'Database Design'
	| 'End-to-End Testing'
	| 'Frontend Architecture'
	| 'Integration Testing'
	| 'Load Testing'
	| 'OOP'
	| 'OSS'
	| 'Regression Testing'
	| 'Requirements Analysis'
	| 'Responsive Design'
	| 'SEO'
	| 'SOLID Principles'
	| 'SSG'
	| 'State Management'
	| 'Static Code Analysis'
	| 'System Design'
	| 'TDD'
	| 'Technical Documentation'
	| 'UI/UX'
	| 'Unit Testing'
	| 'Version Control'
	| 'Web Design'
	| 'Web Performance';

/**
 * A type representing a skill
 */
export type Skill = LanguageSkill | TechnologySkill | ToolSkill | TopicSkill;

/**
 * Config object used to define skills
 *
 * @param languages - A list of formal languages
 * @param technologies - A list of technologies (ie. frameworks, libraries, etc.)
 * @param tools - A list of tools
 * @param topics - A list of topics
 */
export type SkillsConfig = {
	[SkillType.Languages]: readonly LanguageSkill[];
	[SkillType.Technologies]: readonly TechnologySkill[];
	[SkillType.Tools]: readonly ToolSkill[];
	[SkillType.Topics]: readonly TopicSkill[];
};
