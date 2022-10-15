import { ErrorHandler, Injectable} from "@angular/core";
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: Error) {
    this.writeLog(error)
  }

  writeLog(error: Error) {
    console.error(error)
  }
}
