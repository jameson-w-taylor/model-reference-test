"use client";

import { builder } from '@builder.io/sdk';
import { BuilderContent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogArticle {
	title: string;
	slug: string;
	image: string;
	date: number;
	content: string;
	blurb?: string;
	author?: {
    value: {
      data: { fullname: string; image?: string; };
    };
  };
}

interface BlogProps {
  content: any;
}

function Blog({ content }: BlogProps) {
  return (
    <BuilderContent model="blog-article" content={content}>
      {(data: BlogArticle, loading, fullContent) => {
        return (
          <>
            <div>
              <h1>{data.title}</h1>
              <h4>{data.blurb}</h4>
              <div>
                <small>By {data.author?.value.data.fullname}</small>
                <br />
                <span>{new Date(data.date).toLocaleString()}</span>
              </div>
            </div>
          </>
        );
      }}
    </BuilderContent>
  );
}

export default Blog;
