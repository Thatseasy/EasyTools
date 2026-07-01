import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default function Home() {
  const programs = getAllPosts('programs', ['title', 'excerpt', 'slug']);
  const blogs = getAllPosts('blog', ['title', 'excerpt', 'slug']);

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title">Tools built for you.</h1>
        <p className="hero-subtitle">
          Discover our collection of premium software and read about our journey.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/programs" className="btn btn-primary">
            View Programs
          </Link>
          <Link href="/blog" className="btn btn-secondary">
            Read Blog
          </Link>
        </div>
      </header>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Featured Programs</h2>
        <div className="grid">
          {programs.slice(0, 3).map((program) => (
            <Link key={program.slug} href={`/programs/${program.slug}`} className="card">
              <h3>{program.title}</h3>
              <p>{program.excerpt}</p>
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Learn more &rarr;</span>
            </Link>
          ))}
          {programs.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>No programs published yet.</p>
          )}
        </div>
      </section>

      <section style={{ marginTop: '5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Latest Updates</h2>
        <div className="grid">
          {blogs.slice(0, 3).map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="card">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Read article &rarr;</span>
            </Link>
          ))}
          {blogs.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>No blog posts published yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
