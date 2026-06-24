/*
	A collection of functions to manage and transform skills shown on pages
	-----------------------------------------------------------------------
*/

import { SKILLS_CONFIG } from '../../config/content/skills.ts';
import { warn } from '../../node/logger.ts';
import type { PageContentEntryConfig } from '../../types/content/content.ts';
import {
	type NormalizedSkillDefinition,
	type SkillDefinition,
	type SkillDefinitionsConfig,
	type SkillId,
	type SkillScore,
	type SkillsByType,
	SkillType,
} from '../../types/content/skills.ts';
import { getPageContentConfig } from '../config.ts';
import { filterEntries } from './utils.ts';

// Constants

/** Default priority assigned to skills that do not declare one explicitly. */
const DEFAULT_SKILL_PRIORITY: SkillScore = 0.5;

// TODO: this constant and the associated check once combined skills have been removed
/**
 * Former combined skill labels that must be modeled as separate atomic skills.
 */
const AMBIGUOUS_COMBINED_SKILL_ALIASES = new Set([
	'c/c++',
	'javascript/typescript',
	'jsx/tsx',
	'sass/scss',
]);

// Runtime vars

/** Tracks unknown skill warnings so each unresolved source value logs once. */
let unknownSkillWarnings = new Set<string>();

// Types

/**
 * Validated lookup structure built from the canonical skill configuration.
 */
type SkillCatalog = {
	/** Canonical skill definitions keyed by stable skill ID. */
	byId: ReadonlyMap<SkillId, NormalizedSkillDefinition>;
	/** Canonical skill definitions keyed by normalized ID, display name, or alias. */
	byLookupKey: ReadonlyMap<string, NormalizedSkillDefinition>;
	/** Canonical skill definitions grouped by rendered skill type. */
	byType: {
		[SkillType.Languages]: readonly NormalizedSkillDefinition[];
		[SkillType.Technologies]: readonly NormalizedSkillDefinition[];
		[SkillType.Tools]: readonly NormalizedSkillDefinition[];
		[SkillType.Topics]: readonly NormalizedSkillDefinition[];
	};
};

/**
 * Canonicalization result for a skill reference from project metadata.
 */
export type ResolvedProjectSkill = {
	/** Canonical skill ID, or the original source value for unknown skills. */
	id: SkillId;
	/** Display label to render for the skill reference. */
	displayName: string;
	/** Whether the reference resolved to a known catalog skill. */
	isKnown: boolean;
	/** Original metadata value before canonicalization. */
	source: string;
	/** Skill type for known catalog skills. */
	type?: SkillType;
};

// Functions

/**
 * Normalizes an arbitrary skill lookup string for exact ID, display-name, and
 * alias matching.
 *
 * @param value - Raw skill reference.
 * @returns Trimmed, whitespace-collapsed, lowercase lookup key.
 */
export function normalizeSkillLookupKey(value: string) {
	return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Applies catalog defaults and validates normalized fields for a skill.
 *
 * @param skillDefinition - Raw skill definition from config.
 * @returns Skill definition with defaults applied.
 */
function normalizeSkillDefinition(
	skillDefinition: SkillDefinition,
): NormalizedSkillDefinition {
	const priority = skillDefinition.priority ?? DEFAULT_SKILL_PRIORITY;

	return {
		...skillDefinition,
		priority,
		aliases: skillDefinition.aliases ?? [],
		related: skillDefinition.related ?? [],
	};
}

/**
 * Builds and validates the canonical skill catalog lookup maps.
 *
 * @param skillDefinitionsConfig - Skill definitions grouped by skill type.
 * @returns Validated lookup catalog for canonicalization and page filtering.
 * @throws Error when IDs, display names, aliases, priorities, or relationships are invalid.
 */
export function buildSkillCatalog(
	skillDefinitionsConfig: SkillDefinitionsConfig,
): SkillCatalog {
	const byId = new Map<SkillId, NormalizedSkillDefinition>();
	const byLookupKey = new Map<string, NormalizedSkillDefinition>();
	const canonicalNames = new Map<string, SkillId>();
	const aliasOwners = new Map<string, SkillId>();
	const byType: SkillCatalog['byType'] = {
		[SkillType.Languages]: [],
		[SkillType.Technologies]: [],
		[SkillType.Tools]: [],
		[SkillType.Topics]: [],
	};

	for (const [skillType, skillDefinitions] of Object.entries(
		skillDefinitionsConfig,
	) as [SkillType, readonly SkillDefinition[]][]) {
		byType[skillType] = skillDefinitions.map((skillDefinition) => {
			if (skillDefinition.type !== skillType) {
				throw new Error(
					`Skill '${skillDefinition.id}' is grouped under '${skillType}' but has type '${skillDefinition.type}'`,
				);
			}

			if (byId.has(skillDefinition.id)) {
				throw new Error(`Duplicate skill ID '${skillDefinition.id}'`);
			}

			const normalizedSkillDefinition =
				normalizeSkillDefinition(skillDefinition);
			const canonicalNameKey = normalizeSkillLookupKey(
				normalizedSkillDefinition.displayName,
			);
			const canonicalNameOwner = canonicalNames.get(canonicalNameKey);

			if (canonicalNameOwner) {
				throw new Error(
					`Duplicate skill display name '${normalizedSkillDefinition.displayName}' for '${skillDefinition.id}' and '${canonicalNameOwner}'`,
				);
			}

			byId.set(normalizedSkillDefinition.id, normalizedSkillDefinition);
			canonicalNames.set(canonicalNameKey, normalizedSkillDefinition.id);

			return normalizedSkillDefinition;
		});
	}

	for (const skillDefinition of byId.values()) {
		for (const relatedSkill of skillDefinition.related) {
			if (relatedSkill.skillId === skillDefinition.id) {
				throw new Error(
					`Skill '${skillDefinition.id}' cannot relate to itself`,
				);
			}

			if (!byId.has(relatedSkill.skillId)) {
				throw new Error(
					`Skill '${skillDefinition.id}' has missing relationship target '${relatedSkill.skillId}'`,
				);
			}
		}

		for (const alias of skillDefinition.aliases) {
			const aliasKey = normalizeSkillLookupKey(alias);

			// TODO: Remove this check and the constant once combined skills have been removed
			if (AMBIGUOUS_COMBINED_SKILL_ALIASES.has(aliasKey)) {
				throw new Error(
					`Alias '${alias}' is ambiguous and must be modeled as explicit atomic skills`,
				);
			}

			const canonicalNameOwner = canonicalNames.get(aliasKey);

			if (canonicalNameOwner && canonicalNameOwner !== skillDefinition.id) {
				throw new Error(
					`Alias '${alias}' for '${skillDefinition.id}' collides with canonical skill name '${canonicalNameOwner}'`,
				);
			}

			const aliasOwner = aliasOwners.get(aliasKey);

			if (aliasOwner) {
				throw new Error(
					`Duplicate skill alias '${alias}' for '${skillDefinition.id}' and '${aliasOwner}'`,
				);
			}

			aliasOwners.set(aliasKey, skillDefinition.id);
		}
	}

	for (const skillDefinition of byId.values()) {
		const lookupKeys = [
			skillDefinition.id,
			normalizeSkillLookupKey(skillDefinition.displayName),
			...skillDefinition.aliases.map(normalizeSkillLookupKey),
		];

		for (const lookupKey of lookupKeys) {
			const lookupOwner = byLookupKey.get(lookupKey);

			if (lookupOwner && lookupOwner.id !== skillDefinition.id) {
				throw new Error(
					`Skill lookup '${lookupKey}' resolves to both '${lookupOwner.id}' and '${skillDefinition.id}'`,
				);
			}

			byLookupKey.set(lookupKey, skillDefinition);
		}
	}

	return { byId, byLookupKey, byType };
}

/** Validated canonical skill catalog used by runtime content managers. */
const SKILL_CATALOG = buildSkillCatalog(SKILLS_CONFIG);

/**
 * Gets every canonical skill definition with defaults applied.
 *
 * @returns Normalized skill definitions in catalog insertion order.
 */
export function getSkillDefinitions() {
	return [...SKILL_CATALOG.byId.values()];
}

/**
 * Gets a canonical skill definition by stable ID.
 *
 * @param skillId - Canonical skill ID.
 * @returns The normalized skill definition, or `undefined` when absent.
 */
export function getSkillDefinition(skillId: SkillId) {
	return SKILL_CATALOG.byId.get(skillId);
}

/**
 * Resolves a skill reference to its canonical skill ID.
 *
 * @param skillReference - Skill ID, display name, or alias.
 * @returns Canonical skill ID, or `undefined` when no catalog entry matches.
 */
export function getCanonicalSkillId(skillReference: string) {
	return SKILL_CATALOG.byLookupKey.get(normalizeSkillLookupKey(skillReference))
		?.id;
}

/**
 * Gets the directional one-hop relationship weight between two skills.
 *
 * @param fromSkillReference - Source skill ID, display name, or alias.
 * @param toSkillReference - Target skill ID, display name, or alias.
 * @returns `1` for the same canonical skill, the configured relationship weight, or `undefined`.
 */
export function getSkillRelationshipWeight(
	fromSkillReference: string,
	toSkillReference: string,
) {
	const fromSkillId = getCanonicalSkillId(fromSkillReference);
	const toSkillId = getCanonicalSkillId(toSkillReference);

	if (!fromSkillId || !toSkillId) {
		return undefined;
	}

	if (fromSkillId === toSkillId) {
		return 1;
	}

	return getSkillDefinition(fromSkillId)?.related.find(
		(relationship) => relationship.skillId === toSkillId,
	)?.weight;
}

/**
 * Canonicalizes a project metadata skill reference for rendering.
 *
 * @remarks
 * Unknown skills are returned defensively with their source text preserved so
 * external metadata can reference skills before this site updates its catalog.
 *
 * @param skillReference - Raw skill value from project metadata or GitHub language data.
 * @returns Resolved skill information for rendering and diagnostics.
 */
export function resolveProjectSkill(
	skillReference: string,
): ResolvedProjectSkill {
	const knownSkill = SKILL_CATALOG.byLookupKey.get(
		normalizeSkillLookupKey(skillReference),
	);

	if (knownSkill) {
		return {
			id: knownSkill.id,
			displayName: knownSkill.displayName,
			isKnown: true,
			source: skillReference,
			type: knownSkill.type,
		};
	}

	if (!unknownSkillWarnings.has(skillReference)) {
		warn(`Unknown skill '${skillReference}' is not in the canonical catalog`);
		unknownSkillWarnings = new Set([...unknownSkillWarnings, skillReference]);
	}

	return {
		id: skillReference as SkillId,
		displayName: skillReference,
		isKnown: false,
		source: skillReference,
	};
}

/**
 * Clears the unknown-skill warning cache for isolated tests.
 */
export function resetUnknownSkillWarningsForTests() {
	unknownSkillWarnings = new Set();
}

/**
 * Converts skill references into display labels.
 *
 * @param skillReferences - Skill IDs, display names, aliases, or unknown source values.
 * @returns Display labels in the same order as the input references.
 */
export function formatSkillReferences(skillReferences: readonly string[]) {
	return skillReferences.map(
		(skillReference) => resolveProjectSkill(skillReference).displayName,
	);
}

/**
 * Gets the display-ready skills selected for a page.
 *
 * @param pagePath - Absolute page path.
 * @returns Skill display labels grouped by skill type.
 */
export function getSkillsForPage(pagePath: string) {
	const pageSkillsConfig = getPageContentConfig(pagePath).skills;

	const filterSkillType = (skillType: SkillType): string[] =>
		filterEntries<NormalizedSkillDefinition>(
			pagePath,
			SKILL_CATALOG.byType[skillType],
			pageSkillsConfig[
				skillType
			] as PageContentEntryConfig<NormalizedSkillDefinition>,
			(skill) => skill.id,
		).map((skillDefinition) => skillDefinition.displayName);

	return {
		[SkillType.Languages]: filterSkillType(SkillType.Languages),
		[SkillType.Technologies]: filterSkillType(SkillType.Technologies),
		[SkillType.Tools]: filterSkillType(SkillType.Tools),
		[SkillType.Topics]: filterSkillType(SkillType.Topics),
	} satisfies SkillsByType;
}
