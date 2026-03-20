import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostFrontmatter {
  slug: string;
  lang: string;
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  headerGradient: string;
  pullQuote: string;
  hreflangSlug: string;
  nextSlug?: string;
  nextTitle?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export function getAllPosts(lang: 'ko' | 'en'): Post[] {
  const dir = path.join(process.cwd(), 'content', 'hub', lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as PostFrontmatter, content };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getPost(lang: 'ko' | 'en', slug: string): Post | null {
  const filePath = path.join(process.cwd(), 'content', 'hub', lang, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as PostFrontmatter, content };
}

export function getAllSlugs(lang: 'ko' | 'en'): string[] {
  const dir = path.join(process.cwd(), 'content', 'hub', lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
