"use client"

import { useEffect, useState } from "react"
import type { MouseEvent } from "react"
import type { ArticleHeading } from "@/components/markdown-article"
import { cn } from "@/lib/utils"

export function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveId(visible[0].target.id)
    }, { rootMargin: "-96px 0px -70% 0px" })
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const moveToHeading = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const heading = document.getElementById(id)
    if (!heading) return
    heading.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`)
    heading.focus({ preventScroll: true })
  }

  return (
    <nav aria-label="글 목차">
      <p className="mb-2 text-sm font-semibold tracking-tight text-slate-950">목차</p>
      <ol className="border-l border-slate-200 py-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              title={heading.text}
              aria-current={activeId === heading.id ? "location" : undefined}
              onClick={(event) => moveToHeading(event, heading.id)}
              className={cn(
                "relative block truncate py-1.5 pr-1 leading-5 transition-colors before:absolute before:-left-px before:top-1 before:h-5 before:w-0.5 before:rounded-full before:bg-transparent",
                heading.level === 3 ? "pl-5 text-[13px]" : "pl-3 text-sm font-medium",
                activeId === heading.id
                  ? "text-[#52685b] before:bg-[#34443c]"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
