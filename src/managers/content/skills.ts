/*
	A collection of functions to manage and transform skills shown on pages
	-----------------------------------------------------------------------
*/

import { SKILLS_CONFIG } from '../../config/content/skills.ts';
import type { PageContentEntryConfig } from '../../types/content/content.ts';
import {
	type LanguageSkill,
	type Skill,
	type SkillsConfig,
	SkillType,
	type TechnologySkill,
	type ToolSkill,
	type TopicSkill,
} from '../../types/content/skills.ts';
import { getPageContentConfig } from '../config.ts';
import { filterEntries } from './utils.ts';

/**
 * Given a page path, returns an object containing the computed list of skills for each skill type.
 *
 * @param pagePath The path of the page.
 * @returns An object containing the computed list of skills for each skill type.
 */
export function getSkillsForPage(pagePath: string) {
	const pageSkillsConfig = getPageContentConfig(pagePath).skills;

	const filterSkillType = <T extends Skill>(skillType: SkillType): T[] =>
		filterEntries<T>(
			pagePath,
			SKILLS_CONFIG[skillType] as readonly T[],
			pageSkillsConfig[skillType] as PageContentEntryConfig<T>,
			(skill) => skill,
		);

	return {
		[SkillType.Languages]: filterSkillType<LanguageSkill>(SkillType.Languages),
		[SkillType.Technologies]: filterSkillType<TechnologySkill>(
			SkillType.Technologies,
		),
		[SkillType.Tools]: filterSkillType<ToolSkill>(SkillType.Tools),
		[SkillType.Topics]: filterSkillType<TopicSkill>(SkillType.Topics),
	} satisfies SkillsConfig;
}
