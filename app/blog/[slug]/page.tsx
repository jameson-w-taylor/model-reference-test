import { builder, BuilderContent as Content } from '@builder.io/sdk';
import Blog from '@/components/Blog/Blog';

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
	params: Promise<{ slug: string; }>;
}

export async function generateStaticParams() {
	const slugs = await builder.getAll('blog-article', {
		options: { noTargeting: true, enrich: false },
		fields: 'data.slug'
	});
	return slugs.map(article => ({ slug: article.data?.slug }));
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const content: Content = await builder.get('blog-article', {
		options: { enrich: true },
		query: { 'data.slug': slug }
	}).toPromise();

	console.log('Content API: ', content);

	return (
		<>
			<div>My Header</div>
			<Blog content={content} />
			<div>My Footer</div>
		</>
	);
}
