import Button from "./Button";

interface HeaderProps {
  onAdd: () => void;
}

function Header({ onAdd }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg text-lg font-bold tracking-tight text-slate-900">
          <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white" aria-hidden="true">
            M
          </span>
          <span>
            Mini<span className="text-indigo-600">Store</span>
          </span>
        </a>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
          <a
            href="#catalog"
            className="hidden min-h-11 items-center rounded-lg px-3 min-[400px]:flex text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Products
          </a>
          <Button onClick={onAdd}>
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M10 4v12M4 10h12" />
            </svg>
            <span>
              Add<span className="hidden sm:inline"> product</span>
            </span>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
