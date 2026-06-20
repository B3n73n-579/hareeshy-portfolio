import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

export default function BlogPreview() {
  return (
    <Section id="blog" title="Latest Posts" subtitle="Thoughts on engineering, architecture, and technology" action={
      <Link to="/blog" className="text-sm text-primary transition-colors hover:text-secondary">
        View all posts &rarr;
      </Link>
    }>
      <div className="grid gap-8 md:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link to={`/blog/${post.slug}`}>
              <Card hoverable className="flex h-full flex-col">
                <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Badge variant="primary">{post.category}</Badge>
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}