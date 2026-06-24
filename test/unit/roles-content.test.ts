import { describe, expect, test } from 'bun:test';
import {
	buildRole,
	validateRolesConfig,
} from '../../src/managers/content/roles.ts';
import { RoleType } from '../../src/types/content/roles.ts';
import {
	buildRoleConfig,
	buildRolesConfig,
	roleId,
} from '../support/content-fixtures.ts';

describe('role content model', () => {
	test('rejects duplicate role IDs across role types', () => {
		const duplicateRoleId = roleId('duplicate-role');
		const rolesConfig = buildRolesConfig({
			[RoleType.Employment]: [buildRoleConfig({ id: duplicateRoleId })],
			[RoleType.Education]: [
				buildRoleConfig({
					id: duplicateRoleId,
					title: 'Different Role',
				}),
			],
		});

		expect(() => validateRolesConfig(rolesConfig)).toThrow(/Duplicate role ID/);
	});

	test('keeps role identity stable across date and display-text changes', () => {
		const stableRoleId = roleId('stable-role');
		const originalRole = buildRole(
			buildRoleConfig({
				id: stableRoleId,
				title: 'Software Developer',
				startDate: '2020-01-01',
			}),
		);
		const changedRole = buildRole(
			buildRoleConfig({
				id: stableRoleId,
				title: 'Senior Software Developer',
				company: 'Renamed Company',
				startDate: '2024-01-01',
			}),
		);

		expect(originalRole.id).toBe(stableRoleId);
		expect(changedRole.id).toBe(stableRoleId);
		expect(originalRole.id).toBe(changedRole.id);
	});
});
