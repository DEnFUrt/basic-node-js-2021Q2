import StatusCodes from 'http-status-codes' ;

class InternalServerError extends Error {
  status: string;

  message: string;
  
  constructor(message: string, params = 'none') {
    super(
      message ||
        `Internal Server Error with: ${params}`
    );
    this.status = `${StatusCodes.INTERNAL_SERVER_ERROR}`;
    this.message = message;
  }
};

export default InternalServerError;