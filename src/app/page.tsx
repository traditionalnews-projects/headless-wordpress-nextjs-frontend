import { fetchGraphQL } from '../lib/api';
import Link from 'next/link';

const GET_POSTS = `
  query GetPosts {
    posts {
      nodes {
        title
        slug
        uri
      }
    }
  }
`;

export default async function Home() {
  const { posts } = await fetchGraphQL(GET_POSTS);

  return (
    <main style={{ padding: '20px' }}>
      <h1>Latest WordPress Posts</h1>
      {posts.nodes.length ? (
        <ul>
          {posts.nodes.map((post: any) => (
            <li key={post.slug} style={{ marginBottom: '10px' }}>
              <Link href={post.uri}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found. Please create some in your WordPress admin.</p>
      )}
    </main>
  );
}
