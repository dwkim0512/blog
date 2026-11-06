import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { postViewHref } from "@/lib/post-routes"
import { resolvePostThumbnail } from "@/lib/post-images"
import type { Post } from "@/lib/models/post"

function plainText(post: Post) {
  return (post.excerpt || post.content || "내용이 없습니다.")
    .replace(/^#\s+.*?\n\n?/m, "")
    .replace(/```[\s\S]*?```/g, " 코드 예제 ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}


export function PostCard({ post }: { post: Post }) {
 const thumbnail = resolvePostThumbnail(post.content || "", post.thumbnail_url)
 const date = new Date(post.created_at).toLocaleDateString("ko-KR")
 return (
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e2e2df] bg-white transition-colors hover:border-[#b8b8b2]">
        <Link href={postViewHref(post.slug)} className="block aspect-[2/1] overflow-hidden border-b border-[#ecece8] bg-[#eeeeeb]">
          {thumbnail ? (
            <img src={thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#efefec]">
              <div className="text-center">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#aaa9a3]">GOLDEN RECORD</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#77766f]">{post.category_name || "Engineering"}</p>
              </div>
            </div>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-[#4f6258]">{post.category_name || "미분류"}</span>
            <span className="text-[#999891]">{date}</span>
          </div>
          <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-[#20211f]">
            <Link href={postViewHref(post.slug)}>{post.title}</Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666760]">{plainText(post)}</p>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[#92928b]">
            <div className="flex gap-3"><span>좋아요 {post.likes_count}</span><span>댓글 {post.comments_count}</span></div>
            <Link href={postViewHref(post.slug)} aria-label={`${post.title} 읽기`} className="text-[#555650] transition-colors group-hover:text-black"><ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </article>
 )
}
