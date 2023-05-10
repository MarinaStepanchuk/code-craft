import User from '@/components/User/User'
import styles from './profile.module.scss'

export const metadata = {
  title: '[user] of Code Craft',
}

export default function Profile() {
  return (
    <main>
      <h1 className={styles.title}>Profile</h1>
      <User/>
    </main>
  )
}
