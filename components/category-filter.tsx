"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: number
  name: string
  postCount: number
}

interface CategoryFilterProps {
  categories: Category[]
  basePath?: string
  onNavigateStart?: () => void
  horizontal?: boolean
}

export function CategoryFilter({ categories, basePath = "/", onNavigateStart, horizontal = false }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") || "All"

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === selectedCategory) return
    onNavigateStart?.()
    const params = new URLSearchParams(searchParams.toString())
    if (categoryName === "All") {
      params.delete("category")
    } else {
      params.set("category", categoryName)
    }
    params.set("page", "1") // 카테고리 변경 시 첫 페이지로
    router.push(`${basePath}?${params.toString()}`)
  }

  if (horizontal) return (
    <nav aria-label="카테고리" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-slate-200">
      {[{ id: 0, name: "All", postCount: 0 }, ...categories].map(item => (
        <button key={item.id} onClick={() => handleCategoryClick(item.name)} aria-current={selectedCategory === item.name ? "page" : undefined} className={`border-b-2 py-3 text-sm transition-colors ${selectedCategory === item.name ? "border-[#34443c] font-medium text-[#34443c]" : "border-transparent text-slate-500 hover:text-slate-900"}`}>
          {item.name === "All" ? "전체" : item.name}
          {item.name !== "All" && <span className="ml-2 text-xs text-slate-400">{item.postCount}</span>}
        </button>
      ))}
    </nav>
  )

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight text-gray-950">카테고리</h3>
      <div className="border-t border-gray-200">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`block w-full border-b border-gray-100 px-0 py-3 text-left text-sm transition-colors ${
            selectedCategory === "All"
              ? "border-b-[#52685b] font-semibold text-[#52685b]"
              : "text-gray-500 hover:text-gray-950"
          }`}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex w-full items-center justify-between border-b border-gray-100 px-0 py-3 text-left text-sm transition-colors ${
              selectedCategory === category.name
                ? "border-b-[#52685b] font-semibold text-[#52685b]"
                : "text-gray-500 hover:text-gray-950"
            }`}
          >
            {category.name}
            <Badge variant="secondary" className="ml-2 rounded-full bg-gray-100 text-xs font-normal text-gray-500">
              {category.postCount}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}
