const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    size = '', 
    block = false,
    disabled = false
  }) => {
    const classes = [
      'btn',
      `btn-${variant}`,
      size && `btn-${size}`,
      block && 'btn-block'
    ].filter(Boolean).join(' ');
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
      >
        {children}
      </button>
    );
  };
  
  export default Button;