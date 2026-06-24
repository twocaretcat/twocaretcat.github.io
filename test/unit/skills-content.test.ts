import { describe, expect, test } from 'bun:test';
import {
	buildSkillCatalog,
	formatSkillReferences,
	getCanonicalSkillId,
	getSkillDefinitions,
	getSkillRelationshipWeight,
	resolveProjectSkill,
	resetUnknownSkillWarningsForTests,
} from '../../src/managers/content/skills.ts';
import {
	type SkillDefinition,
	type SkillRelationship,
	SkillType,
} from '../../src/types/content/skills.ts';
import {
	buildSkillDefinition,
	buildSkillDefinitionsConfig,
	buildSkillRelationship,
	skillId,
} from '../support/content-fixtures.ts';

void ({
	skillId: skillId('target-skill'),
	// @ts-expect-error Relationship weights are restricted to one decimal place.
	weight: 1.5,
} satisfies SkillRelationship);

void ({
	id: skillId('source-skill'),
	displayName: 'Source Skill',
	type: SkillType.Languages,
	// @ts-expect-error Skill priorities are restricted to one decimal place.
	priority: -0.1,
} satisfies SkillDefinition);

describe('skill content model', () => {
	test('canonicalizes exact normalized names and aliases', () => {
		expect(getCanonicalSkillId('JavaScript')).toBe('js');
		expect(getCanonicalSkillId(' js ')).toBe('js');
		expect(getCanonicalSkillId('JS')).toBe('js');
		expect(getCanonicalSkillId('Gatsby')).toBe('gatsby');
		expect(getCanonicalSkillId('Tailwind CSS')).toBe('tailwind');
		expect(getCanonicalSkillId('Node.js')).toBe('node');
		expect(getCanonicalSkillId('Next.js')).toBe('next');
		expect(getCanonicalSkillId('Regular Expressions')).toBe('regex');
		expect(getCanonicalSkillId('VS Code')).toBe('vscode');
		expect(getCanonicalSkillId('MIPS Assembly')).toBe('mips');
		expect(formatSkillReferences(['js', 'ts', 'graphql'])).toEqual([
			'JavaScript',
			'TypeScript',
			'GraphQL',
		]);
	});

	test('models former combined skills as atomic definitions', () => {
		const skillDefinitions = getSkillDefinitions();
		const skillIds = skillDefinitions.map(
			(skillDefinition) => skillDefinition.id,
		);
		const displayNames = skillDefinitions.map(
			(skillDefinition) => skillDefinition.displayName,
		);

		expect(skillIds).toContain('js');
		expect(skillIds).toContain('ts');
		expect(skillIds).toContain('jsx');
		expect(skillIds).toContain('tsx');
		expect(skillIds).toContain('sass');
		expect(skillIds).toContain('scss');
		expect(skillIds).toContain('c');
		expect(skillIds).toContain('cpp');
		expect(skillIds).toContain('regex');
		expect(skillIds).toContain('vscode');
		expect(displayNames).not.toContain('JavaScript/TypeScript');
		expect(displayNames).not.toContain('JSX/TSX');
		expect(displayNames).not.toContain('SASS/SCSS');
		expect(displayNames).not.toContain('C/C++');
	});

	test('falls back defensively for unknown project skills', () => {
		resetUnknownSkillWarningsForTests();

		expect(resolveProjectSkill('brand-new-skill')).toEqual({
			id: 'brand-new-skill',
			displayName: 'brand-new-skill',
			isKnown: false,
			source: 'brand-new-skill',
		});
		expect(formatSkillReferences(['brand-new-skill'])).toEqual([
			'brand-new-skill',
		]);
	});

	test('looks up one-hop directional relationships', () => {
		expect(getSkillRelationshipWeight('js', 'ts')).toBe(0.9);
		expect(getSkillRelationshipWeight('ts', 'js')).toBe(0.8);
		expect(getSkillRelationshipWeight('next', 'node')).toBe(0.7);
		expect(getSkillRelationshipWeight('sass', 'css')).toBe(0.8);
		expect(getSkillRelationshipWeight('css', 'sass')).toBeUndefined();
		expect(getSkillRelationshipWeight('js', 'JavaScript')).toBe(1);
	});

	test('defaults priority to 0.5', () => {
		const catalog = buildSkillCatalog(
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({ id: skillId('source-skill') }),
				],
			}),
		);

		expect(catalog.byId.get(skillId('source-skill'))?.priority).toBe(0.5);
	});

	test('rejects invalid skill catalogs', () => {
		const targetSkill = buildSkillDefinition({
			id: skillId('target-skill'),
			displayName: 'Target Skill',
		});

		const invalidCatalogs = [
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({ id: skillId('duplicate-skill') }),
					buildSkillDefinition({
						id: skillId('duplicate-skill'),
						displayName: 'Duplicate Skill 2',
					}),
				],
			}),
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({ aliases: ['Shared Alias'] }),
					buildSkillDefinition({
						id: skillId('target-skill'),
						displayName: 'Target Skill',
						aliases: ['Shared Alias'],
					}),
				],
			}),
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({ aliases: ['Target Skill'] }),
					targetSkill,
				],
			}),
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({ aliases: ['JavaScript/TypeScript'] }),
				],
			}),
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({
						related: [buildSkillRelationship({ skillId: skillId('missing') })],
					}),
				],
			}),
			buildSkillDefinitionsConfig({
				[SkillType.Languages]: [
					buildSkillDefinition({
						related: [
							buildSkillRelationship({ skillId: skillId('source-skill') }),
						],
					}),
				],
			}),
		];

		for (const invalidCatalog of invalidCatalogs) {
			expect(() => buildSkillCatalog(invalidCatalog)).toThrow();
		}
	});
});
