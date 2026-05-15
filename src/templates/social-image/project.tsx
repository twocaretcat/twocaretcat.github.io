/*
	Template used to generate Open Graph images for project pages
	-------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { useCallback } from 'react';
import { Section } from '../../components/layout/section.tsx';
import { ProjectCard } from '../../components/project-card.tsx';
import { SignatureGhostButton } from '../../components/seo/signature-ghost-button.tsx';
import { SocialImage } from '../../components/seo/social-image.tsx';
import type { ButtonElementRenderFn } from '../../types/components.ts';
import type { ProjectSocialImagePageContext } from '../../types/page-context.ts';

export default function ProjectSocialImageTemplate({
	pageContext: { project, imageMetadata },
}: PageProps<null, ProjectSocialImagePageContext>) {
	const renderButton = useCallback(
		(({ className, tooltipPosition }) => (
			<SignatureGhostButton
				className={className}
				tooltipPosition={tooltipPosition}
			/>
		)) as ButtonElementRenderFn,
		[],
	);

	return (
		<SocialImage size={imageMetadata.size} className="justify-center">
			<Section
				title="Project"
				responsive={false}
				renderButton={renderButton}
				className="py-0 px-10"
			>
				<ProjectCard project={project} />
			</Section>
		</SocialImage>
	);
}

export { SocialImageHead as Head } from '../../components/seo/social-image-head.tsx';
