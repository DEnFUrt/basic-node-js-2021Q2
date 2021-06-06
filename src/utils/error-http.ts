class HttpError extends Error {
  status: string;

  message: string;
  
  constructor(status: string, message: string, params = 'none') {
    super(
      message || `${message}. With params: ${params}`
      );
    this.status = `${status}`;
    this.message = message;
  }
};

export default HttpError;
