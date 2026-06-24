/*
	A collection of functions to manage and transform roles shown on pages
	----------------------------------------------------------------------
*/

import { ROLES_CONFIG } from '../../config/content/roles.ts';
import {
	type Role,
	type RoleConfig,
	type RoleId,
	type RolesConfig,
	RoleType,
} from '../../types/content/roles.ts';
import { ifDefined, keysOf } from '../../utils/other.ts';
import { getPageContentConfig } from '../config.ts';
import { filterEntries } from './utils.ts';

// Types

/**
 * Runtime roles selected for a page, grouped by rendered role type.
 */
type RoleSubsets = {
	/** Employment roles selected for the page. */
	[RoleType.Employment]: Role[];
	/** Education roles selected for the page. */
	[RoleType.Education]: Role[];
	/** Volunteering roles selected for the page. */
	[RoleType.Volunteering]: Role[];
};

// Functions

/**
 * Validates that every role has a unique stable ID.
 *
 * @param rolesConfig - Role configuration grouped by role type.
 * @throws Error when a role ID is invalid or duplicated.
 */
export function validateRolesConfig(rolesConfig: RolesConfig) {
	const roleIds = new Set<RoleId>();

	for (const [roleType, roleConfigs] of Object.entries(rolesConfig) as [
		RoleType,
		readonly RoleConfig[],
	][]) {
		for (const roleConfig of roleConfigs) {
			if (roleIds.has(roleConfig.id)) {
				throw new Error(
					`Duplicate role ID '${roleConfig.id}' in '${roleType}' roles`,
				);
			}

			roleIds.add(roleConfig.id);
		}
	}
}

/** Validates source role config during module initialization. */
validateRolesConfig(ROLES_CONFIG);

/**
 * Builds a runtime role from source config.
 *
 * @remarks
 * Role config stores dates as strings for readability while runtime role
 * consumers use Date objects for sorting and display.
 *
 * @param roleConfig - Source role config object.
 * @returns Runtime role with parsed dates.
 */
export function buildRole({
	category,
	startDate,
	endDate,
	...remainingProps
}: RoleConfig): Role {
	return {
		...remainingProps,
		...ifDefined({ category }),
		startDate: new Date(startDate),
		endDate: new Date(endDate),
	};
}

/**
 * Gets the roles selected for a page.
 *
 * @param pagePath - Absolute page path.
 * @returns Runtime role subsets grouped by role type.
 */
export function getRolesForPage(pagePath: string) {
	const pageContentConfig = getPageContentConfig(pagePath);
	const pageRolesConfig = pageContentConfig?.roles;
	const roleSubsets: RoleSubsets = {
		[RoleType.Employment]: [],
		[RoleType.Education]: [],
		[RoleType.Volunteering]: [],
	};
	const roleTypes = keysOf(roleSubsets);

	// For each role type, get the computed list of roles
	for (const roleType of roleTypes) {
		roleSubsets[roleType] = filterEntries(
			pagePath,
			ROLES_CONFIG[roleType].map(buildRole),
			pageRolesConfig[roleType],
			({ id }) => id,
		);
	}

	return roleSubsets;
}
