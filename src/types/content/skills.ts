/**
 * Type definitions for skills and skill configs
 */

/**
 * High-level buckets used to group skill definitions in the source catalog and
 * rendered resume sections.
 */
export enum SkillType {
	/** Programming languages and language-like syntaxes. */
	Languages = 'languages',
	/** Frameworks, libraries, platforms, runtimes, and services. */
	Technologies = 'technologies',
	/** Developer tools and applications. */
	Tools = 'tools',
	/** Practices, concepts, and cross-cutting areas of expertise. */
	Topics = 'topics',
}

/**
 * Stable lowercase kebab-case identifier for a canonical skill.
 */
export type SkillId = Lowercase<string>;

/**
 * Normalized skill score, constrained to one decimal place from 0 to 1.
 */
export type SkillScore =
	| 0
	| 0.1
	| 0.2
	| 0.3
	| 0.4
	| 0.5
	| 0.6
	| 0.7
	| 0.8
	| 0.9
	| 1;

/**
 * Weighted one-hop relationship from one skill to another.
 */
export type SkillRelationship = {
	/** Canonical ID of the related target skill. */
	skillId: SkillId;
	/** Directional relevance from the source skill to the target skill. */
	weight: SkillScore;
};

/**
 * Canonical skill definition consumed by project metadata and portfolio
 * rendering.
 */
export type SkillDefinition = {
	/** Stable ID used by source metadata, page filters, and relationships. */
	id: SkillId;
	/** Human-readable label rendered in the UI and README output. */
	displayName: string;
	/** Skill bucket used for grouping and page filtering. */
	type: SkillType;
	/**
	 * Relative display or curation priority from 0 to 1.
	 *
	 * @defaultValue 0.5
	 */
	priority?: SkillScore;
	/** Alternate names that resolve to this skill during metadata canonicalization. */
	aliases?: readonly string[];
	/** Directional one-hop relationships to other canonical skills. */
	related?: readonly SkillRelationship[];
};

/**
 * Fully hydrated skill definition used after catalog defaults are applied.
 */
export type NormalizedSkillDefinition = Omit<
	SkillDefinition,
	'aliases' | 'priority' | 'related'
> & {
	/** Normalized priority with the default value applied. */
	priority: SkillScore;
	/** Alias list with the empty-list default applied. */
	aliases: readonly string[];
	/** Relationship list with the empty-list default applied. */
	related: readonly SkillRelationship[];
};

/**
 * Complete canonical skill catalog grouped by skill type.
 */
export type SkillDefinitionsConfig = {
	/** Programming languages and language-like syntaxes. */
	[SkillType.Languages]: readonly SkillDefinition[];
	/** Frameworks, libraries, platforms, runtimes, and services. */
	[SkillType.Technologies]: readonly SkillDefinition[];
	/** Developer tools and applications. */
	[SkillType.Tools]: readonly SkillDefinition[];
	/** Practices, concepts, and cross-cutting areas of expertise. */
	[SkillType.Topics]: readonly SkillDefinition[];
};

/**
 * Display-ready skill labels grouped by type for rendered page output.
 */
export type SkillsByType = {
	/** Language labels selected for the page. */
	[SkillType.Languages]: readonly string[];
	/** Technology labels selected for the page. */
	[SkillType.Technologies]: readonly string[];
	/** Tool labels selected for the page. */
	[SkillType.Tools]: readonly string[];
	/** Topic labels selected for the page. */
	[SkillType.Topics]: readonly string[];
};
