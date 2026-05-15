/*
	Template used to generate an Open Graph image for the landing page
	------------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { GhostButton } from '../../components/input/ghost-button.tsx';
import { HeroHeader } from '../../components/layout/hero-header.tsx';
import { SignatureGhostButton } from '../../components/seo/signature-ghost-button.tsx';
import { SocialImage } from '../../components/seo/social-image.tsx';
import type { IndexSocialImagePageContext } from '../../types/page-context.ts';

export default function IndexSocialImageTemplate({
	pageContext: { imageMetadata },
}: PageProps<null, IndexSocialImagePageContext>) {
	return (
		<SocialImage
			size={imageMetadata.size}
			className="justify-between text-center"
		>
			<SignatureGhostButton />
			<div className="flex flex-col">
				<HeroHeader expandTitle />
			</div>
			{/* Dummy element to force center alignment of section */}
			<GhostButton text="" />
		</SocialImage>
	);
}

export { SocialImageHead as Head } from '../../components/seo/social-image-head.tsx';
