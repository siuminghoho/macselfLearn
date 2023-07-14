const timeoutHandler = ():void => {
    console.log("Timeout happens!");
  };
  
  const timeout = 1000;
  
  setTimeout(timeoutHandler, timeout);