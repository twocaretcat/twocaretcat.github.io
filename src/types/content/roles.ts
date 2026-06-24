/**
 * Type definitions for roles and role configs
 */

import type {
	CityAndStateString,
	DateString,
	SentenceString,
	UrlString,
} from '../strings.ts';
import type { Overwrite } from '../utils.ts';

/**
 * High-level buckets used to group resume roles in source config and rendered
 * sections.
 */
export enum RoleType {
	/** Paid professional experience entries. */
	Employment = 'employment',
	/** Academic credential entries. */
	Education = 'education',
	/** Volunteer experience entries. */
	Volunteering = 'volunteering',
}

/**
 * Optional labels used to distinguish specific employment role categories.
 */
export enum RoleCategory {
	/** Internship employment role. */
	Internship = 'Internship',
	/** Seasonal employment role. */
	SeasonalJob = 'Seasonal Job',
}

/**
 * Stable lowercase kebab-case ID used by presets, overrides, and page filters.
 */
export type RoleId = Lowercase<string>;

/**
 * Runtime resume role after date strings have been parsed.
 */
export type Role = {
	/** Stable role ID used for identity and filtering. */
	id: RoleId;
	/** Optional category label for special role classifications. */
	category?: RoleCategory;
	/** Role title rendered in resume and timeline entries. */
	title: Capitalize<string>;
	/** Organization name rendered for the role. */
	company: Capitalize<string>;
	/** Organization website URL. */
	companyUrl: UrlString;
	/** Parsed start date for sorting and display. */
	startDate: Date;
	/** Parsed end date for sorting and display. */
	endDate: Date;
	/** Role location rendered in resume entries. */
	location: CityAndStateString;
	/** Role bullet points rendered under the entry. */
	bullets: SentenceString[];
};

/**
 * Source configuration for a single role before date parsing.
 */
export type RoleConfig = Overwrite<
	Role,
	{
		startDate: DateString;
		endDate: DateString;
	}
>;

/**
 * Complete role configuration grouped by resume role type.
 */
export type RolesConfig = {
	/** Employment role definitions. */
	[RoleType.Employment]: RoleConfig[];
	/** Education role definitions. */
	[RoleType.Education]: RoleConfig[];
	/** Volunteering role definitions. */
	[RoleType.Volunteering]: RoleConfig[];
};
