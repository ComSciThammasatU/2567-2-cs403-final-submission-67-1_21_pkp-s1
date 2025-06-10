export default function SelectField({ label, name, options, onChange }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}
          {<span className="text-red-500">*</span>}
        </label>
        <select name={name} onChange={onChange} className="w-full p-2 border border-gray-400 rounded mt-1 max-w-2xl" > 
          <option value="">เลือกเพศ</option>
            {options.map((option, index) => (
                  <option key={index}  value={option.value}>
                      {option.label}
                  </option>
          ))}
        </select>
      </div>
    );
  }
  