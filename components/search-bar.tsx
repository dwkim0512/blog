"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  onNavigateStart?: () => void
}

export function SearchBar({ onNavigateStart }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    const query = searchQuery.trim()
    if (query === (searchParams.get("search") || "")) return
    onNavigateStart?.()
    if (query) params.set("search", query)
    else params.delete("search")
    params.set("page", "1")
    router.push(`${pathname === "/categories" || pathname === "/categories/" ? "/categories" : "/"}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight text-gray-950">검색</h3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="게시글 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 min-w-0 flex-1 rounded-none border-x-0 border-t-0 px-0 shadow-none focus-visible:ring-0"
        />
        <Button type="submit" size="icon" variant="ghost" className="h-10 w-10 shrink-0 rounded-none border-b">
          <Search className="h-4 w-4 text-[#52685b]" />
        </Button>
      </div>
    </form>
  )
}
