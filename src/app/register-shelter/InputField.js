import { Eye, EyeOff } from "lucide-react";

export default function InputField({ label, name, type = "text", required, textarea, onChange, toggleVisibility, showPassword }) {
    return (
      <div className="relative max-w-2xl">
        <label className="block text-md font-medium text-gray-700 front-normal">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
        {textarea ? (
          <textarea name={name} onChange={onChange} className="w-full p-2 border border-gray-400 rounded mt-1 max-w-2xl" rows="3" required={required}></textarea>
        ) : (
          <input type={type} name={name} onChange={onChange} className="mt-1 block w-full border border-gray-400 rounded-md p-3 max-w-2xl pr-10" required={required} />
        )}
        {toggleVisibility && (
          <button type="button" className="absolute inset-y-0 right-3 pr-3 flex items-center text-sm leading-5" onClick={toggleVisibility}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        </div>
      </div>
    );
}