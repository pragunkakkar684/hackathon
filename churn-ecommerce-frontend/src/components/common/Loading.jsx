const Loading = ({ size = 'md' }) => {
    const spinnerSize = size === 'sm' ? 'spinner-sm' : 
                        size === 'lg' ? 'spinner-lg' : '';
    
    return (
      <div className="loading-container">
        <div className={`loading-spinner ${spinnerSize}`}></div>
      </div>
    );
  };
  
  export default Loading;