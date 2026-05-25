

const Input = ({ label, type = "text", className, error, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-1 block"
                    htmlFor={label}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                    className={`w-full border border-gray-400 ${className}`}
                {...props}
            
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
