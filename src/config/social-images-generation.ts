/*
	Social images generation configuration
	--------------------------------------
*/

import {
	type SocialImagesGenerationConfig,
	SocialImageType,
} from '../types/other.ts';

export const SOCIAL_IMAGES_GENERATION_CONFIG: SocialImagesGenerationConfig = {
	defaults: {
		type: 'webp',
		quality: 100,
		verbose: false,
	},
	types: {
		[SocialImageType.OpenGraph]: {
			size: {
				width: 2400,
				height: 1260,
			},
		},
		[SocialImageType.X]: {
			size: {
				width: 2400,
				height: 1200,
			},
		},
	},
} as const;
