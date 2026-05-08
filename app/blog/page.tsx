import { XMLParser } from 'fast-xml-parser';
import { decode } from 'html-entities';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  const res = await fetch('https://uglycryvintage.substack.com/feed', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Substack feed');
  }

  const xml = await res.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: false,
  });

  const parsed = parser.parse(xml);
  const items = parsed.rss?.channel?.item ?? [];

  return items.map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: item['content:encoded'] || item.description,
  }));
}

function extractPreview(html: string, maxLength = 280): string {
  // Decode all HTML entities (&amp;, &#39;, &nbsp;, etc.)
  const decoded = decode(html, { level: 'html5' });

  // Strip HTML tags
  const text = decoded
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;

  // Try to break at a sentence boundary
  const truncated = text.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');

  if (lastPeriod > maxLength * 0.6) {
    return truncated.slice(0, lastPeriod + 1);
  }

  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '...';
}

export default async function BlogPage() {
  const posts = await fetchSubstackPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">From the Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.link}
            className="border rounded-lg p-6 flex flex-col"
          >
            <time className="text-sm text-gray-500 mb-2">
              {new Date(post.pubDate).toLocaleDateString()}
            </time>
            <h2 className="text-xl font-semibold mb-3 leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 grow leading-relaxed">
              {extractPreview(post.description)}
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Read More
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}