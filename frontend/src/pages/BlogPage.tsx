import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const allCategories = [...new Set(BLOG_POSTS.map((p) => p.category))]
const allTags = [...new Set(BLOG_POSTS.flatMap((p) => p.tags))]

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.excerpt.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (category && post.category !== category) return false
      if (activeTag && !post.tags.includes(activeTag)) return false
      return true
    })
  }, [search, category, activeTag])

  const paginated = filtered.slice(0, page * perPage)

  return (
    <div className="pt-20">
      <Section title="Blog" subtitle="Thoughts on engineering, architecture, and technology">
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                category === null ? 'bg-primary text-bg' : 'border border-white/10 bg-white/5 text-gray-300 hover:border-primary/30'
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  category === cat ? 'bg-primary text-bg' : 'border border-white/10 bg-white/5 text-gray-300 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveTag(activeTag === tag ? null : tag); setPage(1) }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  activeTag === tag ? 'bg-secondary text-white' : 'border border-white/10 bg-white/5 text-gray-300 hover:border-secondary/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <Card hoverable className="flex h-full flex-col">
                  <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Badge variant="primary">{post.category}</Badge>
                    <span>{post.publishedAt}</span>
                    <span>{post.readingTime} min</span>
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-white">{post.title}</h3>
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

        {paginated.length < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-primary/30 bg-primary/10 px-8 py-3 font-heading text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              Load More
            </button>
          </div>
        )}
      </Section>
    </div>
  )
}