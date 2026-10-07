import type { ReactNode } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

/** Accessible dialog (focus trap, Esc, scroll lock via Headless UI). Bottom sheet on mobile, centered card on larger screens. */
function Modal({ open, onClose, title, description, footer, children }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-900/50 transition-opacity duration-200 data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="flex max-h-[92dvh] w-full flex-col rounded-t-2xl bg-white shadow-xl transition duration-200 data-[closed]:translate-y-4 data-[closed]:opacity-0 sm:max-w-lg sm:rounded-2xl sm:data-[closed]:translate-y-2 sm:data-[closed]:scale-95"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
            <div className="min-w-0">
              <DialogTitle className="text-lg font-semibold text-slate-900">{title}</DialogTitle>
              {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto px-5 py-5">{children}</div>
          {footer && (
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end">
              {footer}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Modal;
