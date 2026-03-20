export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
          Emmanuel Oghene © {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
          Fullstack Developer — Remote
        </span>
      </div>
    </footer>
  )
}
