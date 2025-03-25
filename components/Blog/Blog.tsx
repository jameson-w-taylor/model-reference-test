'use client';

import { builder } from '@builder.io/sdk';
import { BuilderContent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogArticle {
	title: string;
	author?: {
		value: {
			data: { fullname: string; };
		};
	};
}

interface BlogProps {
	content: any;
}

function Blog({ content }: BlogProps) {
	// Must add `options={{ enrich: true }}` to <BuilderContent> to match default behavior of Content API
	return (
		<BuilderContent model="blog-article" content={content}>
			{(data: BlogArticle) => {
				console.log(data);
				return (
					<>
						<div>
							<h1>{data.title}</h1>
							{data.author && (
								<div>
									<small>By {data.author?.value.data.fullname}</small>
								</div>
							)}
						</div>
					</>
				);
			}}
		</BuilderContent>
	);
}

export default Blog;
