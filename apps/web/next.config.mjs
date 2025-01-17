await import('@next-nest-expo-turbo-boilerplate/env').then(({ getWebEnv }) => {
  console.log(getWebEnv())
  getWebEnv()
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

export default nextConfig
