export abstract class JwtGateway {
  abstract sign(sub: string): string
}
