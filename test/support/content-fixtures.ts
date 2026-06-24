import {
	RoleCategory,
	type RoleConfig,
	type RoleId,
	type RolesConfig,
	RoleType,
} from '../../src/types/content/roles.ts';
import {
	type SkillDefinition,
	type SkillDefinitionsConfig,
	type SkillId,
	type SkillRelationship,
	SkillType,
} from '../../src/types/content/skills.ts';

export function buildSkillRelationship(
	overrides: Partial<SkillRelationship> = {},
): SkillRelationship {
	return {
		skillId: 'target-skill',
		weight: 0.5,
		...overrides,
	};
}

export function buildSkillDefinition(
	overrides: Partial<SkillDefinition> = {},
): SkillDefinition {
	return {
		id: 'source-skill',
		displayName: 'Source Skill',
		type: SkillType.Languages,
		...overrides,
	};
}

export function buildSkillDefinitionsConfig(
	skillDefinitions: Partial<SkillDefinitionsConfig> = {},
): SkillDefinitionsConfig {
	return {
		[SkillType.Languages]: [],
		[SkillType.Technologies]: [],
		[SkillType.Tools]: [],
		[SkillType.Topics]: [],
		...skillDefinitions,
	};
}

export function buildRoleConfig(
	overrides: Partial<RoleConfig> = {},
): RoleConfig {
	return {
		id: 'source-role' as RoleId,
		category: RoleCategory.Internship,
		title: 'Software Developer',
		company: 'Example Company',
		companyUrl: 'https://example.com',
		location: 'Edmonton, AB',
		startDate: '2020-01-01',
		endDate: '2020-12-31',
		bullets: ['Built a portfolio content curation system.'],
		...overrides,
	};
}

export function buildRolesConfig(
	rolesConfig: Partial<RolesConfig> = {},
): RolesConfig {
	return {
		[RoleType.Employment]: [],
		[RoleType.Education]: [],
		[RoleType.Volunteering]: [],
		...rolesConfig,
	};
}

export function skillId(skillId: string) {
	return skillId as SkillId;
}

export function roleId(roleId: string) {
	return roleId as RoleId;
}
