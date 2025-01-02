export type JwtPayload = {
  accountId: string
}

export type JwtSignParams = {
  payload: JwtPayload
  expiresIn: string
}

export abstract class JwtGateway {
  abstract sign(params: JwtSignParams): string
  abstract verify(token: string): JwtPayload
}
