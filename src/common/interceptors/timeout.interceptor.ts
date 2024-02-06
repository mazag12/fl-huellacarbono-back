import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, timeout } from "rxjs";

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(timeout(1500000)); // {NOTE}: 15 MINUTOs
    }
}
