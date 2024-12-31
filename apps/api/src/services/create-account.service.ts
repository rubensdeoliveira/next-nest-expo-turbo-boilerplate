import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { CreateAccountBodySchema } from '@/controllers/create-account.controller'
import { PrismaService } from '@/prisma/prisma.service'

type CreateAccountServiceInput = CreateAccountBodySchema

type CreateAccountServiceOutput = {
  email: string
  name: string
}

@Injectable()
export class CreateAccountService {
  constructor(private prisma: PrismaService) {}

  async execute(
    data: CreateAccountServiceInput,
  ): Promise<CreateAccountServiceOutput> {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same email already exists')
    }

    const hashedPassword = await hash(data.password, 8)

    const { email, name } = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    return {
      email,
      name,
    }
  }
}
