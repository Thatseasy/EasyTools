import { getPostBySlug, getPostSlugs, markdownToHtml, fetchGithubReadme, fetchGithubLatestRelease } from '@/lib/api';
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
    'githubRepo'
  ]);

  if (!post) {
    return notFound();
  }

  // Local installation instructions
  const content = await markdownToHtml(post.content || '');
  
  // GitHub data
  let readmeHtml = '';
  let releaseData = null;
  
  if (post.githubRepo) {
    const rawReadme = await fetchGithubReadme(post.githubRepo);
    if (rawReadme) {
      readmeHtml = await markdownToHtml(rawReadme);
    }
    releaseData = await fetchGithubLatestRelease(post.githubRepo);
  }

  return (
    <div className="container">
      <div className="prose">
        <h1 style={{ margin: 0, marginBottom: '1rem' }}>{post.title}</h1>
        
        {/* Download Buttons Section */}
        {releaseData && releaseData.assets && releaseData.assets.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {releaseData.assets.map((asset) => (
              <a key={asset.name} href={asset.browser_download_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Download {asset.name} ({releaseData.tag_name})
              </a>
            ))}
          </div>
        )}
        
        {(!releaseData || !releaseData.assets || releaseData.assets.length === 0) && post.githubRepo && (
           <div style={{ marginBottom: '2rem' }}>
              <a href={`https://github.com/${post.githubRepo}/releases/latest`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                View latest releases on GitHub
              </a>
           </div>
        )}

        <p className="meta">
          Published on {post.date}
          {releaseData ? ` • Latest version: ${releaseData.tag_name}` : ''}
        </p>
        
        {/* Local Content (Installation) */}
        {content && (
          <div style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {/* GitHub README */}
        {readmeHtml && (
          <div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '2rem' }} />
            <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
          </div>
        )}
      </div>
    </div>
  );
}
