type PropsHttpError = { status: string; message: string; params?: string };

class HttpError extends Error {
  status: string;

  message: string;
  
  constructor({status, message, params = 'none'}: PropsHttpError) {
    super(
      message || `${message}. With params: ${params}`
      );
    this.status = `${status}`;
    this.message = message;
  }
};

export default HttpError;
