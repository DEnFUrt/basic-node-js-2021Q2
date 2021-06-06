import StatusCodes from 'http-status-codes' ;

class InternalServerError extends Error {
  status: string;

  message: string;
  
  constructor(message: string, params?: string) {
    super(
      message ||
        `Internal Server Error with params: ${
          params !== undefined? params : 'undefined' 
        }`
    );
    this.status = `${StatusCodes.INTERNAL_SERVER_ERROR}`;
    this.message = message;
  }
};

export default InternalServerError;