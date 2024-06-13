
const Checkbox = ({ isChecked, onChange }) => {
    const handleCheckboxChange = () => {
        onChange(!isChecked);
    }
    return (
        <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-transparent accent-[#fa5030]"
            type="checkbox" />
    )
}

export default Checkbox
