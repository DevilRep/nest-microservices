import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException): any {
        console.log('exception', exception);
        if (exception.message === 'test') {
            throw new NotFoundException('Entity not found');
        }
        throw exception;
    }
}
