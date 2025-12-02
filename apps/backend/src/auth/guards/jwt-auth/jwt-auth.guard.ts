import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GqlContext } from 'src/common/types/gql-context';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);

    const ctx = gqlCtx.getContext<GqlContext>();

    if (!ctx.req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return ctx.req;
  }
}
