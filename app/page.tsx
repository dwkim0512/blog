"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { PostCard } from "@/components/post-card"
import { ProfileContact } from "@/components/profile-contact"
import { PostPagination } from "@/components/post-pagination"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient, getApiBaseUrl } from "@/lib/api-client"
import { postViewHref } from "@/lib/post-routes"
import type { Profile } from "@/lib/profile"
import type { Post } from "@/lib/models/post"

interface Category { id: number; name: string; post_count?: number }
interface PostList { posts: Post[]; pagination: { page: number; totalPages: number; total?: number } | null }

export default function HomePage() {
  const params = useSearchParams()
  const category = params.get("category") || ""
  const search = params.get("search") || ""
  const page = Math.max(1, Number.parseInt(params.get("page") || "1") || 1)
  const [data, setData] = useState<PostList>({ posts: [], pagination: null })
  const [categories, setCategories] = useState<Category[]>([])
  const [latest, setLatest] = useState<Post[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all([
      apiClient.getCategories().catch(() => []),
      apiClient.getAdminProfile().catch(() => null),
      apiClient.getPosts({ page: 1, limit: 3, sortBy: "created_at" }).catch(() => ({ posts: [] })),
    ]).then(([categoryData, profileData, latestData]) => {
      if (!active) return
      setCategories(categoryData as Category[])
      setProfile((profileData as { profile?: Profile } | null)?.profile || null)
      setLatest((latestData as { posts: Post[] }).posts || [])
    })
    fetch(`${getApiBaseUrl()}/api/visitors/track`, { method: "POST", credentials: "include" }).catch(() => {})
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(false)
    apiClient.getPosts({ category, search, page, limit: 9, sortBy: sortBy === "popular" ? "likes" : "created_at" })
      .then(result => { if (active) setData(result as PostList) })
      .catch(() => { if (active) { setError(true); setData({ posts: [], pagination: null }) } })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [category, search, page, sortBy])

  const categoryHref = (name?: string) => {
    const next = new URLSearchParams()
    if (name) next.set("category", name)
    if (search) next.set("search", search)
    return next.size ? `/?${next.toString()}` : "/"
  }

  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      <Header />
      <section className="relative isolate overflow-hidden border-b border-[#e2e5e7] bg-[#f9fafb]">
        <div aria-hidden="true" className="hero-vinyl-backdrop pointer-events-none absolute -right-[800px] top-1/2 -z-10 hidden h-[1200px] w-[1200px] -translate-y-1/2 lg:block">
          <img src="/golden-record-vinyl.png" alt="" className="hero-vinyl h-full w-full object-contain" />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-16">
            <section aria-label="프로필 명함" className="flex w-full max-w-[480px] flex-col items-start gap-5 rounded-lg border border-[#dfe3dc] bg-white p-6 sm:aspect-[1.8/1] sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <img src={profile?.avatar_url || "/default-profile.svg"} alt={`${profile?.name || "개발자"} 프로필`} className="h-16 w-16 shrink-0 rounded-full border border-slate-200 object-cover sm:h-24 sm:w-24" />
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#242b25]">{profile?.name || "Golden Record"}</h1>
                <p className="mt-3 text-sm leading-6 text-[#70756b]">{profile?.bio || "개발하며 배우고 경험한 내용을 기록합니다."}</p>
                <ProfileContact githubUsername={profile?.github_username} />
                <Link href="/about" className="mt-3 inline-flex items-center gap-1 text-xs text-[#66735f] hover:underline">더 보기 <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </section>
            <section aria-label="최신 게시글" className="min-w-0 lg:mr-24">
              <h2 className="mb-2 text-xs font-semibold tracking-wide text-[#778170]">새로 새긴 기록</h2>
              {latest.map((post, index) => (
                <Link key={post.id} href={postViewHref(post.slug)} className="group flex items-center gap-4 border-b border-[#dfe3df] py-4">
                  <span className="text-xs tabular-nums text-[#949c8d]">0{index + 1}</span>
                  <div className="min-w-0 flex-1"><p className="text-[11px] text-[#7b8774]">{post.category_name || "미분류"}</p><h3 className="mt-1 truncate text-base font-medium text-[#363e32] group-hover:underline">{post.title}</h3></div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#949d8c]" />
                </Link>
              ))}
              {!latest.length && <p className="py-6 text-sm text-slate-500">새로운 기록을 준비하고 있습니다.</p>}
            </section>
          </div>
        </div>
      </section>

      <main id="posts" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-8 pb-20 lg:px-8 lg:py-10">
        <nav aria-label="게시글 카테고리" className="mb-7 flex flex-wrap gap-x-5 gap-y-2">
          {[{ id: 0, name: "" }, ...categories].map(item => (
            <Link key={item.id} href={categoryHref(item.name)} aria-current={category === item.name ? "page" : undefined} className={`border-b-2 px-1 py-2 text-sm font-semibold ${category === item.name ? "border-[#34443c] text-[#34443c]" : "border-transparent text-slate-500 hover:text-slate-900"}`}>{item.name || "전체"}</Link>
          ))}
        </nav>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-5">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{search ? `“${search}” 검색 결과` : category || "전체 게시글"}</h2>
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-48"><SearchBar /></div>
            <div className="flex gap-2">
            <Button size="sm" variant={sortBy === "latest" ? "default" : "outline"} aria-pressed={sortBy === "latest"} onClick={() => setSortBy("latest")}>최신순</Button>
            <Button size="sm" variant={sortBy === "popular" ? "default" : "outline"} aria-pressed={sortBy === "popular"} onClick={() => setSortBy("popular")}>인기순</Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div aria-label="게시글 불러오는 중" role="status" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(index => <div key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-white"><Skeleton className="aspect-[2/1] w-full rounded-none" /><div className="space-y-4 p-6"><Skeleton className="h-4 w-20" /><Skeleton className="h-6 w-4/5" /><Skeleton className="h-12 w-full" /></div></div>)}
          </div>
        ) : error ? <p role="alert" className="py-16 text-center text-sm text-slate-500">게시글을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>
          : data.posts.length ? <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{data.posts.map(post => <PostCard key={post.id} post={post} />)}</div>
            {data.pagination && <PostPagination currentPage={data.pagination.page} totalPages={data.pagination.totalPages} />}
          </> : <p className="py-16 text-center text-sm text-slate-500">{search ? "검색 결과가 없습니다." : "아직 게시글이 없습니다."}</p>}
      </main>
    </div>
  )
}
