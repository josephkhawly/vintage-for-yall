import Image from 'next/image';
import { fetchSubstackPosts, extractPreview } from '@/lib/substack';

function ReadMoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
    >
      Read More
      <svg
        className="ml-1 size-4"
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
  );
}

export default async function BlogPage() {
  const posts = await fetchSubstackPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">From the Blog</h1>

      {featured ? (
        <article
          key={featured.link}
          className="border-2 rounded-xl overflow-hidden mb-10 md:mb-12 flex flex-col bg-gray-50/50"
        >
          {featured.previewImage ? (
            <div className="relative aspect-2/1 w-full bg-gray-200">
              <Image
                src={featured.previewImage}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
              />
            </div>
          ) : null}
          <div className="p-8 md:p-10 flex flex-col grow">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Latest
              </span>
              <time className="text-sm text-gray-500">
                {new Date(featured.pubDate).toLocaleDateString()}
              </time>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
              {featured.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-6 max-w-3xl leading-relaxed">
              {extractPreview(featured.description, 400)}
            </p>
            <ReadMoreLink href={featured.link} />
          </div>
        </article>
      ) : null}

      {rest.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <article
              key={post.link}
              className="border rounded-lg overflow-hidden flex flex-col"
            >
              {post.previewImage ? (
                <div className="relative aspect-16/10 w-full shrink-0 bg-gray-200">
                  <Image
                    src={post.previewImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-6 flex flex-col grow">
                <time className="text-sm text-gray-500 mb-2">
                  {new Date(post.pubDate).toLocaleDateString()}
                </time>
                <h2 className="text-xl font-semibold mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 grow leading-relaxed">
                  {extractPreview(post.description)}
                </p>
                <ReadMoreLink href={post.link} />
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}