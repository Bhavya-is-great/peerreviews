export default class ExpressError extends Error {
  constructor(message = "Internal Server Error", statusCode = 500, data = null) {
    super(message);
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}
