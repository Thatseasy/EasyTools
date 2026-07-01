import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs(type: 'blog' | 'programs') {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return [];
  }
  return fs.readdirSync(dir).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(type: 'blog' | 'programs', slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, type, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(type: 'blog' | 'programs', fields: string[] = []) {
  const slugs = getPostSlugs(type);
  const posts = slugs
    .map((slug) => getPostBySlug(type, slug, fields))
    .filter((post) => post !== null)
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function fetchGithubReadme(repo: string): Promise<string | null> {
  if (!repo) return null;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3.raw',
    'User-Agent': 'EasyTools-NextJS'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) {
      console.error(`Failed to fetch README for ${repo}: ${res.statusText}`);
      return null;
    }
    return await res.text();
  } catch (error) {
    console.error(`Error fetching README for ${repo}:`, error);
    return null;
  }
}

export type GithubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

export type GithubRelease = {
  tag_name: string;
  name: string;
  assets: GithubReleaseAsset[];
};

export async function fetchGithubLatestRelease(repo: string): Promise<GithubRelease | null> {
  if (!repo) return null;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'EasyTools-NextJS'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      console.error(`Failed to fetch latest release for ${repo}: ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching release for ${repo}:`, error);
    return null;
  }
}
