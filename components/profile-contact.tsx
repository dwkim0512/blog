import { Github, Mail } from "lucide-react"

export function ProfileContact({ githubUsername }: { githubUsername?: string }) {
  return (
    <div className="mt-4 border-t border-[#e2e5e7] pt-3">
      <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-slate-400">CONTACT</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#526358]">
        {githubUsername && <a href={`https://github.com/${githubUsername.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline"><Github className="h-3.5 w-3.5" />@{githubUsername.replace(/^@/, "")}</a>}
        <a href="mailto:shet6006@gmail.com" className="inline-flex items-center gap-1.5 hover:underline"><Mail aria-label="Gmail" className="h-3.5 w-3.5" />shet6006@gmail.com</a>
        <a href="tel:+821080121428" className="inline-flex items-center gap-1.5 hover:underline"><span role="img" aria-label="대한민국">🇰🇷</span>+82 10-8012-1428</a>
      </div>
    </div>
  )
}
