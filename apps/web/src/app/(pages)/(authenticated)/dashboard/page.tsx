import { SignOut } from '../../(auth)/actions'

export default function Dashboard() {
  return (
    <form action={SignOut}>
      <button type="submit">Logout</button>
    </form>
  )
}
