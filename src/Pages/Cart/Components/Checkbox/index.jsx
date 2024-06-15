const Checkbox = ({ checked, onChange }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-transparent accent-[#fa5030] cursor-pointer" />
    )
}

export default Checkbox
