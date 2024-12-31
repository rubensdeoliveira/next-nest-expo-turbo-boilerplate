import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { CreateSessionBodySchema } from '@/controllers/create-session.controller'
import { PrismaService } from '@/prisma/prisma.service'

type CreateSessionServiceInput = CreateSessionBodySchema

type CreateSessionServiceOutput = {
  access_token: string
}

@Injectable()
export class CreateSessionService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async execute(
    data: CreateSessionServiceInput,
  ): Promise<CreateSessionServiceOutput> {
    const { email, password } = data

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const access_token = this.jwt.sign({
      sub: user.id,
    })

    return {
      access_token,
    }
  }
}
