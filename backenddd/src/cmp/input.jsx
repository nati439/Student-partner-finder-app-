// cmp/Input.jsx
export default function Input({ value, onChange, placeholder, type = "text" }) {
    return (
        //almost useless. Used in LoginSign.jsx
        <input
            type={type}
            className="p-4 rounded bg-gray-800 text-white placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}