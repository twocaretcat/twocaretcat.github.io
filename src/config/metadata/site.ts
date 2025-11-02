/*
	Site metadata
	-------------
*/

import type { SiteMetadataConfig } from '../../types/other.ts';

export const SITE_METADATA_CONFIG: SiteMetadataConfig = {
	iconPath: 'images/icon.svg',
	siteUrl: 'https://johng.io/',
	sourceUrl: 'https://github.com/twocaretcat/twocaretcat.github.io/',
	author: {
		name: {
			first: 'John',
			last: 'Goodliff',
		},
		jobTitle: 'Software Developer',
		alumniOf: 'University of Alberta',
		imageUrl:
			'https://2.gravatar.com/avatar/17dff698e6f6992387f1650b6111daa02ba7cae1b0eb453b65b30036c4e36253?size=1024',
		username: {
			linkedin: 'johngoodliff',
			github: 'twocaretcat',
			x: 'twocaretcat',
			patreon: 'twocaretcat',
			braveCreators: 'johng',
		},
		location: {
			city: 'Edmonton',
			state: 'Alberta',
			country: 'Canada',
		},
	},
} as const;
