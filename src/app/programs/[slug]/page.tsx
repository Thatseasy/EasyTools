import { getPostBySlug, getPostSlugs, markdownToHtml } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getPostSlugs('programs');
  return posts.map((post) => ({
    slug: post.replace(/\.md$/, ''),
  }));
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug('programs', slug, [
    'title',
    'date',
    'slug',
    'content',
    'version',
    'downloadUrl'
  ]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <div className="container">
      <div className="prose">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0 }}>{post.title}</h1>
          {post.downloadUrl && (
            <a href={post.downloadUrl} className="btn btn-primary">
              Download v{post.version}
            </a>
          )}
        </div>
        <p className="meta">Published on {post.date} &bull; Version {post.version}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
