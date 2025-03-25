import { builder } from '@builder.io/sdk';
import Blog from '@/components/Blog/Blog';

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: Promise<{ slug: string; }>;
}

export async function generateStaticParams() {
  const slugs = await builder.getAll('blog-article', {
  	options: { noTargeting: true },
    fields: 'data.slug'
  });
  return slugs.map(article => ({ slug: `/blog/${article.data?.slug}`}));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const content = await builder
    .get('blog-article', {
      query: {
        'data.slug': slug
      },
    })
    .toPromise();
	
		console.log(content);

  return (
    <>
      <div>My Header</div>
			<Blog content={content} />
			<div>My Footer</div>
    </>
  );
}
