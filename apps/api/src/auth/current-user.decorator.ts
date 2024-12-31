import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrentUserType = { id: string }

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): CurrentUserType => {
    const request = context.switchToHttp().getRequest()

    const { sub } = request.user

    return { id: sub }
  },
)
