/**
 * Type definitions for page content (roles, skills, projects, etc.)
 */

import type { SortFn } from '../other.ts';
import type { AbsolutePathString } from '../strings.ts';
import type { Project } from './projects.ts';
import { type Role, type RoleId, RoleType } from './roles.ts';
import {
	type LanguageSkill,
	SkillType,
	type TechnologySkill,
	type ToolSkill,
	type TopicSkill,
} from './skills.ts';

/**
 * Top-level content collections that can be curated per page.
 */
export enum ContentType {
	/** Resume role content. */
	Roles = 'roles',
	/** Skill content. */
	Skills = 'skills',
	/** Project content. */
	Projects = 'projects',
}

/**
 * Visibility overrides for page-level content curation entries.
 */
export enum EntryVisibility {
	/** Always display the entry and allow it to curate related entries. */
	Pin = 'pin',
	/** Display the entry even if automatic filters exclude it. */
	Show = 'show',
	/** Hide the entry even if automatic filters include it. */
	Hide = 'hide',
}

/**
 * Page-level curation settings for one content collection.
 *
 * @typeParam T - Entry type being curated.
 * @typeParam K - Stable ID type used by the entry collection.
 */
export type PageContentEntryConfig<T, K extends string = string> = {
	/** Maximum number of entries to display after filtering and sorting. */
	limit?: number;
	/** Optional sorter applied to entries before selection. */
	sortFn?: SortFn<T>;
	/** Whether only pinned entries should be included in the final result. */
	showPinnedOnly?: boolean;
	/** IDs that should always be displayed and may influence related content. */
	[EntryVisibility.Pin]?: K[];
	/** IDs that should be displayed even when an automatic filter excludes them. */
	[EntryVisibility.Show]?: K[];
	/** IDs that should be hidden even when an automatic filter includes them. */
	[EntryVisibility.Hide]?: K[];
};

/**
 * Content curation config for a single page.
 */
export interface PageContentConfig {
	/** Role curation grouped by role type. */
	[ContentType.Roles]: {
		[RoleType.Employment]: PageContentEntryConfig<Role, RoleId>;
		[RoleType.Education]: PageContentEntryConfig<Role, RoleId>;
		[RoleType.Volunteering]: PageContentEntryConfig<Role, RoleId>;
	};
	/** Skill curation grouped by skill type. */
	[ContentType.Skills]: {
		[SkillType.Languages]: PageContentEntryConfig<LanguageSkill, LanguageSkill>;
		[SkillType.Technologies]: PageContentEntryConfig<
			TechnologySkill,
			TechnologySkill
		>;
		[SkillType.Tools]: PageContentEntryConfig<ToolSkill, ToolSkill>;
		[SkillType.Topics]: PageContentEntryConfig<TopicSkill, TopicSkill>;
	};
	/** Project curation for the page. */
	[ContentType.Projects]: PageContentEntryConfig<Project>;
}

/**
 * Page content curation config keyed by absolute page path.
 */
export type PagesContentConfig = {
	[pagePath: AbsolutePathString]: PageContentConfig;
};
