export default function SelectField({ label, name, options, onChange }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select name={name} onChange={onChange} className="w-full p-2 border border-gray-400 rounded mt-1 max-w-2xl">
          {Array.isArray(options) && options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
  