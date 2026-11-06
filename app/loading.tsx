import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f2f3f4]" aria-hidden="true">
      <div className="h-[72px] border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <span className="text-[18px] font-medium leading-none tracking-[0.12em] text-[#303532]">GOLDEN RECORD</span>
          <div className="hidden items-center gap-16 xl:flex">
            {[10, 16, 16, 10].map((width, index) => <Skeleton key={index} className="h-4" style={{ width: width * 4 }} />)}
          </div>
          <Skeleton className="h-9 w-16 rounded-full" />
        </div>
      </div>
      <section className="border-b border-slate-200 bg-[#f9fafb]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-12 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 sm:aspect-[1.8/1] sm:flex-row sm:items-center sm:p-8">
            <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
            <div className="w-full space-y-4"><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /><Skeleton className="h-12 w-full" /></div>
          </div>
          <div className="space-y-5 lg:mr-24"><Skeleton className="h-4 w-24" />{[0, 1, 2].map(index => <div key={index} className="space-y-2 border-b border-slate-200 pb-4"><Skeleton className="h-3 w-16" /><Skeleton className="h-5 w-4/5" /></div>)}</div>
        </div>
      </section>
      <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between"><Skeleton className="h-8 w-40" /><Skeleton className="h-5 w-24" /></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map(index => <div key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-white"><Skeleton className="aspect-[2/1] w-full rounded-none" /><div className="space-y-4 p-6"><Skeleton className="h-3 w-24" /><Skeleton className="h-6 w-4/5" /><Skeleton className="h-12 w-full" /><Skeleton className="h-3 w-20" /></div></div>)}
        </div>
      </main>
    </div>
  )
}
