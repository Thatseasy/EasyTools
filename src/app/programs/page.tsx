import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default function Programs() {
  const programs = getAllPosts('programs', ['title', 'excerpt', 'slug', 'version']);

  return (
    <div className="container">
      <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem' }}>All Programs</h1>
      <div className="grid">
        {programs.map((program) => (
          <Link key={program.slug} href={`/programs/${program.slug}`} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0 }}>{program.title}</h3>
              <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--accent)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>v{program.version}</span>
            </div>
            <p>{program.excerpt}</p>
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>View Details &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
