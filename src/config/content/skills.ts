/*
	Skills
	------
*/

import {
	type SkillDefinition,
	type SkillDefinitionsConfig,
	SkillType,
} from '../../types/content/skills.ts';

/**
 * Creates a typed skill-definition factory for a single skill category.
 *
 * @param type - Skill type to assign to definitions created by the factory.
 * @returns A factory that adds the configured skill type to a definition.
 */
const createSkillDefinition =
	(type: SkillType) =>
	(skillDefinition: Omit<SkillDefinition, 'type'>): SkillDefinition => ({
		...skillDefinition,
		type,
	});

/** Factory for language skill definitions. */
const language = createSkillDefinition(SkillType.Languages);

/** Factory for technology skill definitions. */
const technology = createSkillDefinition(SkillType.Technologies);

/** Factory for tool skill definitions. */
const tool = createSkillDefinition(SkillType.Tools);

/** Factory for topic skill definitions. */
const topic = createSkillDefinition(SkillType.Topics);

/**
 * Canonical portfolio skill catalog.
 *
 * @remarks
 * IDs are the stable metadata values. Display names and aliases are the
 * readable labels that can resolve back to those IDs during canonicalization.
 */
export const SKILLS_CONFIG: SkillDefinitionsConfig = {
	[SkillType.Languages]: [
		// Common
		language({
			id: 'c',
			displayName: 'C',
			related: [{ skillId: 'cpp', weight: 0.8 }],
		}),
		language({
			id: 'cpp',
			displayName: 'C++',
			aliases: ['C plus plus'],
			related: [{ skillId: 'c', weight: 0.7 }],
		}),
		language({
			id: 'css',
			displayName: 'CSS',
			aliases: ['Cascading Style Sheets'],
		}),
		language({ id: 'graphql', displayName: 'GraphQL' }),
		language({
			id: 'html',
			displayName: 'HTML',
			aliases: ['Hyper Text Markup Language'],
		}),
		language({ id: 'java', displayName: 'Java' }),
		language({
			id: 'js',
			displayName: 'JavaScript',
			aliases: ['ECMAScript', 'JS', 'ES'],
			related: [
				{ skillId: 'ts', weight: 0.9 },
				{ skillId: 'jsx', weight: 0.8 },
			],
		}),
		language({
			id: 'ts',
			displayName: 'TypeScript',
			aliases: ['TS'],
			related: [
				{ skillId: 'js', weight: 0.8 },
				{ skillId: 'tsx', weight: 0.8 },
			],
		}),
		language({
			id: 'jsx',
			displayName: 'JSX',
			related: [
				{ skillId: 'js', weight: 0.8 },
				{ skillId: 'react', weight: 0.7 },
			],
		}),
		language({
			id: 'tsx',
			displayName: 'TSX',
			related: [
				{ skillId: 'ts', weight: 0.8 },
				{ skillId: 'react', weight: 0.7 },
			],
		}),
		language({
			id: 'python',
			displayName: 'Python',
			related: [
				{ skillId: 'django', weight: 0.9 },
				{ skillId: 'fastapi', weight: 0.9 },
				{ skillId: 'numpy', weight: 0.7 },
			],
		}),
		language({
			id: 'sass',
			displayName: 'Sass',
			related: [
				{ skillId: 'scss', weight: 0.9 },
				{ skillId: 'css', weight: 0.8 },
			],
		}),
		language({
			id: 'scss',
			displayName: 'SCSS',
			related: [
				{ skillId: 'sass', weight: 0.9 },
				{ skillId: 'css', weight: 0.8 },
			],
		}),
		language({
			id: 'sql',
			displayName: 'SQL',
			aliases: ['Structured Query Language'],
		}),
		// Uncommon
		language({ id: 'bash', displayName: 'Bash' }),
		language({ id: 'datalog', displayName: 'Datalog' }),
		language({ id: 'kotlin', displayName: 'Kotlin' }),
		language({
			id: 'liquid',
			displayName: 'Liquid',
			aliases: ['Liquid Template Language'],
		}),
		language({ id: 'lisp', displayName: 'Lisp' }),
		language({ id: 'lua', displayName: 'Lua' }),
		language({
			id: 'mips',
			displayName: 'MIPS Assembly',
			aliases: ['MIPS'],
		}),
		language({ id: 'nix', displayName: 'Nix' }),
		language({ id: 'r', displayName: 'R' }),
		language({
			id: 'regex',
			displayName: 'Regular Expressions',
			aliases: ['RegExp', 'Regex'],
		}),
		language({
			id: 'vba',
			displayName: 'VBA',
			aliases: ['Visual Basic for Applications', 'Visual Basic'],
		}),
	],
	[SkillType.Technologies]: [
		// Common
		technology({
			id: 'astro',
			displayName: 'Astro',
			aliases: ['Astro.js']
		}),
		technology({
			id: 'cypress',
			displayName: 'Cypress',
			aliases: ['Cypress.js'],
		}),
		technology({
			id: 'django',
			displayName: 'Django',
			related: [{ skillId: 'python', weight: 0.9 }],
		}),
		technology({ id: 'docker', displayName: 'Docker' }),
		technology({
			id: 'express',
			displayName: 'Express.js',
			aliases: ['Express'],
			related: [{ skillId: 'node', weight: 0.9 }],
		}),
		technology({
			id: 'fastapi',
			displayName: 'FastAPI',
			related: [{ skillId: 'python', weight: 0.9 }],
		}),
		technology({ id: 'firebase', displayName: 'Firebase' }),
		technology({
			id: 'gatsby',
			displayName: 'GatsbyJS',
			aliases: ['Gatsby', 'Gatsby.js'],
			related: [
				{ skillId: 'react', weight: 0.8 },
				{ skillId: 'graphql', weight: 0.7 },
			],
		}),
		technology({ id: 'github-actions', displayName: 'GitHub Actions' }),
		technology({ id: 'jest', displayName: 'Jest' }),
		technology({
			id: 'next',
			displayName: 'Next.js',
			aliases: ['NextJS', 'Next'],
			related: [
				{ skillId: 'react', weight: 0.9 },
				{ skillId: 'node', weight: 0.7 },
			],
		}),
		technology({
			id: 'node',
			displayName: 'Node.js',
			aliases: ['NodeJS', 'Node'],
			related: [{ skillId: 'js', weight: 0.8 }],
		}),
		technology({ id: 'oracle-db', displayName: 'Oracle DB' }),
		technology({ id: 'parcel', displayName: 'Parcel' }),
		technology({
			id: 'postcss',
			displayName: 'PostCSS',
			related: [{ skillId: 'css', weight: 0.7 }],
		}),
		technology({
			id: 'postgres',
			displayName: 'PostgreSQL',
			aliases: ['Postgres'],
		}),
		technology({ id: 'puppeteer', displayName: 'Puppeteer' }),
		technology({
			id: 'react',
			displayName: 'React',
			related: [
				{ skillId: 'js', weight: 0.8 },
				{ skillId: 'ts', weight: 0.7 },
				{ skillId: 'jsx', weight: 0.7 },
			],
		}),
		technology({ id: 'selenium', displayName: 'Selenium' }),
		technology({
			id: 'solid',
			displayName: 'SolidJS',
			aliases: ['Solid', 'Solid.js'],
			related: [{ skillId: 'ts', weight: 0.7 }],
		}),
		technology({ id: 'sqlite', displayName: 'SQLite' }),
		technology({
			id: 'tailwind',
			displayName: 'Tailwind CSS',
			aliases: ['TailwindCSS', 'Tailwind'],
			related: [{ skillId: 'css', weight: 0.8 }],
		}),
		technology({ id: 'vercel', displayName: 'Vercel' }),
		technology({
			id: 'vite',
			displayName: 'Vite',
			related: [{ skillId: 'ts', weight: 0.6 }],
		}),
		technology({
			id: 'vue',
			displayName: 'Vue',
			related: [{ skillId: 'js', weight: 0.8 }],
		}),
		technology({ id: 'webpack', displayName: 'Webpack' }),
		technology({ id: 'zod', displayName: 'Zod' }),
		// Uncommon
		technology({ id: 'astro-capo', displayName: 'Astro Capo' }),
		technology({ id: 'astro-sitemap', displayName: 'Astro Sitemap' }),
		technology({ id: 'ava', displayName: 'AVA' }),
		technology({ id: 'biome', displayName: 'Biome' }),
		technology({ id: 'botpoison', displayName: 'Botpoison' }),
		technology({ id: 'bun', displayName: 'Bun' }),
		technology({ id: 'cloudflare-workers', displayName: 'Cloudflare Workers' }),
		technology({ id: 'cuda', displayName: 'CUDA' }),
		technology({ id: 'daisyui', displayName: 'daisyUI' }),
		technology({ id: 'deno', displayName: 'Deno' }),
		technology({ id: 'electron', displayName: 'Electron' }),
		technology({ id: 'eslint', displayName: 'ESLint' }),
		technology({ id: 'gradle', displayName: 'Gradle' }),
		technology({ id: 'grafana', displayName: 'Grafana' }),
		technology({ id: 'gulp', displayName: 'Gulp' }),
		technology({ id: 'jekyll', displayName: 'Jekyll' }),
		technology({ id: 'joi', displayName: 'Joi' }),
		technology({ id: 'jsp', displayName: 'JSP' }),
		technology({ id: 'junit', displayName: 'JUnit' }),
		technology({ id: 'kubernetes', displayName: 'Kubernetes' }),
		technology({ id: 'motion', displayName: 'Motion' }),
		technology({
			id: 'nano-stores',
			displayName: 'Nano Stores',
			aliases: ['Nanostores'],
		}),
		technology({ id: 'numpy', displayName: 'NumPy' }),
		technology({ id: 'octokit', displayName: 'Octokit' }),
		technology({ id: 'openstack', displayName: 'OpenStack' }),
		technology({ id: 'pinia', displayName: 'Pinia' }),
		technology({ id: 'pinia-colada', displayName: 'Pinia Colada' }),
		technology({ id: 'playform-compress', displayName: 'Playform Compress' }),
		technology({ id: 'playwright', displayName: 'Playwright' }),
		technology({ id: 'sonarqube', displayName: 'SonarQube' }),
		technology({ id: 'spring-framework', displayName: 'Spring Framework' }),
		technology({ id: 'vitepress', displayName: 'Vitepress' }),
		technology({ id: 'vitest', displayName: 'Vitest' }),
		technology({ id: 'vue-i18n', displayName: 'Vue I18n' }),
		technology({ id: 'vueuse', displayName: 'VueUse' }),
	],
	[SkillType.Tools]: [
		// Common
		tool({ id: 'claude-code', displayName: 'Claude Code' }),
		tool({ id: 'claude-desktop', displayName: 'Claude Desktop' }),
		tool({ id: 'continue', displayName: 'Continue' }),
		tool({ id: 'dependabot', displayName: 'Dependabot' }),
		tool({ id: 'git', displayName: 'Git' }),
		tool({ id: 'github-copilot', displayName: 'GitHub Copilot' }),
		tool({ id: 'github', displayName: 'GitHub' }),
		tool({ id: 'intellij-idea', displayName: 'IntelliJ IDEA' }),
		tool({ id: 'jira', displayName: 'Jira' }),
		tool({ id: 'jupyter', displayName: 'Jupyter' }),
		tool({ id: 'linux', displayName: 'Linux' }),
		tool({ id: 'postman', displayName: 'Postman' }),
		tool({
			id: 'vscode',
			displayName: 'Visual Studio Code',
			aliases: ['Visual Studio Code', 'VS Code', 'VSCode'],
		}),
		tool({ id: 'visual-studio', displayName: 'Visual Studio' }),
		// Uncommon
		tool({ id: 'android-studio', displayName: 'Android Studio' }),
		tool({ id: 'arduino-ide', displayName: 'Arduino IDE' }),
		tool({ id: 'blender', displayName: 'Blender' }),
		tool({ id: 'chatgpt', displayName: 'ChatGPT' }),
		tool({ id: 'chrome', displayName: 'Chrome' }),
		tool({ id: 'edge', displayName: 'Edge' }),
		tool({ id: 'excel', displayName: 'Excel' }),
		tool({ id: 'firefox', displayName: 'Firefox' }),
		tool({ id: 'gemini', displayName: 'Gemini' }),
		tool({ id: 'gimp', displayName: 'GIMP' }),
		tool({ id: 'graphiql', displayName: 'GraphiQL' }),
		tool({ id: 'inkscape', displayName: 'Inkscape' }),
		tool({ id: 'opera', displayName: 'Opera' }),
		tool({ id: 'oxfmt', displayName: 'Oxfmt' }),
		tool({ id: 'oxlint', displayName: 'Oxlint' }),
		tool({ id: 'prettier', displayName: 'Prettier' }),
		tool({ id: 'slack', displayName: 'Slack' }),
		tool({ id: 'sublime-text', displayName: 'Sublime Text' }),
	],
	[SkillType.Topics]: [
		topic({ id: 'accessibility', displayName: 'Accessibility' }),
		topic({
			id: 'agile',
			displayName: 'Agile Methodologies',
			aliases: ['Agile'],
		}),
		topic({
			id: 'ai-assisted-development',
			displayName: 'AI-Assisted Development',
		}),
		topic({
			id: 'asynchronous-communication',
			displayName: 'Asynchronous Communication',
		}),
		topic({ id: 'automated-releases', displayName: 'Automated Releases' }),
		topic({ id: 'automated-testing', displayName: 'Automated Testing' }),
		topic({ id: 'branding', displayName: 'Branding' }),
		topic({ id: 'ci-cd', displayName: 'CI/CD' }),
		topic({ id: 'cloud-computing', displayName: 'Cloud Computing' }),
		topic({ id: 'code-review', displayName: 'Code Review' }),
		topic({ id: 'component-design', displayName: 'Component Design' }),
		topic({ id: 'containerization', displayName: 'Containerization' }),
		topic({
			id: 'cross-functional-collaboration',
			displayName: 'Cross-Functional Collaboration',
		}),
		topic({ id: 'database-design', displayName: 'Database Design' }),
		topic({
			id: 'e2e',
			displayName: 'End-to-End Testing',
			aliases: ['E2E Testing'],
		}),
		topic({
			id: 'frontend-architecture',
			displayName: 'Frontend Architecture',
		}),
		topic({ id: 'integration-testing', displayName: 'Integration Testing' }),
		topic({ id: 'load-testing', displayName: 'Load Testing' }),
		topic({ id: 'oop', displayName: 'OOP' }),
		topic({ id: 'open-source', displayName: 'Open Source' }),
		topic({ id: 'regression-testing', displayName: 'Regression Testing' }),
		topic({
			id: 'requirements-analysis',
			displayName: 'Requirements Analysis',
		}),
		topic({ id: 'responsive-design', displayName: 'Responsive Design' }),
		topic({ id: 'seo', displayName: 'SEO' }),
		topic({ id: 'solid-principles', displayName: 'SOLID Principles' }),
		topic({ id: 'ssg', displayName: 'SSG' }),
		topic({ id: 'state-management', displayName: 'State Management' }),
		topic({ id: 'static-code-analysis', displayName: 'Static Code Analysis' }),
		topic({ id: 'system-design', displayName: 'System Design' }),
		topic({ id: 'tdd', displayName: 'TDD' }),
		topic({
			id: 'technical-documentation',
			displayName: 'Technical Documentation',
		}),
		topic({ id: 'ui-ux', displayName: 'UI/UX' }),
		topic({ id: 'unit-testing', displayName: 'Unit Testing' }),
		topic({ id: 'version-control', displayName: 'Version Control' }),
		topic({ id: 'web-design', displayName: 'Web Design' }),
		topic({ id: 'web-performance', displayName: 'Web Performance' }),
	],
} as const;
