import { useId } from "react";
import type { ReactElement } from "react";

interface FieldControlProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
  className: string;
}

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  /** Receives the id/aria/className props the control needs. */
  children: (props: FieldControlProps) => ReactElement;
}

/** Label + control + hint/error wiring, shared by every form control. */
function FormField({ label, error, hint, children }: FormFieldProps) {
  const id = useId();
  const messageId = `${id}-msg`;
  const hasMessage = Boolean(error || hint);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": hasMessage ? messageId : undefined,
        className: `block min-h-11 w-full rounded-lg border bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 transition sm:text-sm ${
          error ? "border-red-400" : "border-slate-300 hover:border-slate-400"
        }`,
      })}
      {hasMessage && (
        <p id={messageId} className={`mt-1.5 text-sm ${error ? "text-red-600" : "text-slate-500"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export default FormField;
