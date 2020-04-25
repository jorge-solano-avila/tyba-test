import { Exception } from "../exception";

export class BadRequestException implements Exception {
  statusCode = 401;
  detail = "Invalid request.";

  constructor(detail?: string) {
    if (detail) {
      this.detail = detail;
    }
  }
}
