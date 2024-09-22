const waitForClient = (callback) => {
    const checkClient = setInterval(() => {
      if (typeof $Client !== 'undefined' && typeof $Client.close === 'function') {
        clearInterval(checkClient);
        console.log('$Client is ready and close method is available');
        callback();
      } else if (typeof $Client !== 'undefined') {
        console.log('$Client is defined but the close method is not available yet.');
      } else {
        console.log('Waiting for $Client to load...');
      }
    }, 200);  // Check every 200ms
  };
  
  const closeWidget = (value) => {
    waitForClient(() => {
      try {
        var selected_products = [value];
        $Client.close(selected_products); // Safely use $Client once it's available
        console.log('closeWidget executed successfully with:', selected_products);
      } catch (error) {
        console.error('Failed to close the widget:', error);
      }
    });
  };
  
  export { closeWidget };
  