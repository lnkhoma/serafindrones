import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { DISTRICTS } from "@/lib/districts";
import { cn } from "@/lib/cn";

/**
 * Native <select> of Malawi's districts, grouped by region with <optgroup>.
 * Native keeps it fully keyboard/screen-reader accessible and mobile-friendly.
 * Forward the react-hook-form `register("district")` props straight into it.
 */
const DistrictSelect = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function DistrictSelect({ className, ...props }, ref) {
    return (
      <div className="relative">
        <select ref={ref} className={cn("form-input appearance-none pr-10", className)} {...props}>
          <option value="">Select your district…</option>
          {DISTRICTS.map((group) => (
            <optgroup key={group.region} label={group.label}>
              {group.districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-brand-400"
        />
      </div>
    );
  },
);

export default DistrictSelect;
