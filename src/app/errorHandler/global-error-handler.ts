import { ErrorHandler, Injectable } from "@angular/core";
import { AnalyticsService } from "../services/analytics/analytics.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private analyticsService: AnalyticsService,
    ) {}

    handleError(error: Error) {
        this.analyticsService.exception(error)
        throw error
      }
}
