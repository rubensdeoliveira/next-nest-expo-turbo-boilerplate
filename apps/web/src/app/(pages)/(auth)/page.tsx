import { SignInWithGoogle } from './actions'

export default function SignIn() {
  return (
    <form action={SignInWithGoogle}>
      <button type="submit">Login with Google</button>
    </form>
  )
}
