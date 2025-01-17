import { Header } from '@/app/shared/components/header/header'

import { GoogleButton } from '../../components/google-button/google-button'
import { Container } from './style'

export function Home() {
  return (
    <Container>
      <Header title="Home" />
      <GoogleButton />
    </Container>
  )
}
