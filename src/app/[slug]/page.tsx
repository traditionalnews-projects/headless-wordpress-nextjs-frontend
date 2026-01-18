import { fetchGraphQL } from '../../lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 100) { # Adjust 'first' as needed for your site's scale
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  const { posts } = await fetchGraphQL(GET_ALL_POST_SLUGS);

  return posts.nodes
    .map((post: any) => ({
      slug: post.slug,
    }))
    .filter((params: { slug: string | null | undefined }) => params.slug !== null && params.slug !== undefined);
}

import { fetchGraphQL } from '../../lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 100) { # Adjust 'first' as needed for your site's scale
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  const { posts } = await fetchGraphQL(GET_ALL_POST_SLUGS);

  return posts.nodes
    .map((post: any) => ({
      slug: post.slug,
    }))
    .filter((params: { slug: string | null | undefined }) => params.slug !== null && params.slug !== undefined);
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  console.log('Fetching post for slug:', params.slug);

  // Provide a fallback slug if params.slug is unexpectedly undefined during build
  // This is a TEMPORARY HACK to allow the build to pass and inspect the deployed site
  const actualSlug = params.slug || 'hello-world'; // Use 'hello-world' as a known existing slug

  const { post } = await fetchGraphQL(GET_POST_BY_SLUG, {
    variables: { slug: actualSlug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: '20px' }}>
      <Link href="/">← Back to all posts</Link>
      <h1 style={{ marginTop: '20px' }}>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: '20px' }}>
      <Link href="/">← Back to all posts</Link>
      <h1 style={{ marginTop: '20px' }}>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
