import { getPostBySlug, getPostSlugs, markdownToHtml } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getPostSlugs('blog');
  return posts.map((post) => ({
    slug: post.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug('blog', slug, [
    'title',
    'date',
    'slug',
    'content',
  ]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <div className="container">
      <article className="prose">
        <h1>{post.title}</h1>
        <p className="meta">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
