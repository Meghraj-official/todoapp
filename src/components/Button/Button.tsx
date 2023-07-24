interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, className, ...restProps } = props;
  return (
    <div>
      <button
        onClick={onClick}
        {...restProps}
        className={`border px-6 py-1 rounded-lg shadow-sm ${className} `}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
