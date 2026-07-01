import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default function Blog() {
  const blogs = getAllPosts('blog', ['title', 'excerpt', 'slug', 'date']);

  return (
    <div className="container">
      <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Blog</h1>
      <div className="grid">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="card">
            <h3>{blog.title}</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{blog.date}</p>
            <p>{blog.excerpt}</p>
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Read article &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
