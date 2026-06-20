import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'
import GradientText from '@/components/ui/GradientText'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  const { progress } = useScrollProgress()

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <h1 className="font-heading text-4xl font-bold text-white">Post not found</h1>
        <Link to="/blog" className="mt-4 text-primary hover:underline">
          &larr; Back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="fixed top-16 left-0 right-0 z-30 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" className="mb-8 block text-sm text-gray-400 transition-colors hover:text-primary">
            &larr; Back to blog
          </Link>

          <div className="mb-8 aspect-video rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Badge variant="primary">{post.category}</Badge>
            <span>{post.publishedAt}</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
            <GradientText as="span">{post.title}</GradientText>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-gray-400">{post.excerpt}</p>

          <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
            <p>
              This is a placeholder for the full blog post content. In a production application, this
              would render markdown or MDX content. The post &ldquo;{post.title}&rdquo; covers topics
              in {post.category} with tags: {post.tags.join(', ')}.
            </p>
            <p>
              The reading time for this article is approximately {post.readingTime} minutes. The actual
              content would include code snippets, architecture diagrams, and detailed explanations.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  )
}