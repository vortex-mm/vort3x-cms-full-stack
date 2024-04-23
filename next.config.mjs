import webpack from 'webpack'

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const fallback = config.resolve.fallback || {}
      Object.assign(fallback, {
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        assert: 'assert',
        http: 'stream-http',
        https: 'https-browserify',
        os: 'os-browserify',
        url: 'url'
      })
      config.resolve.fallback = fallback

      // Provide globals in browser environment
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      )
    }

    return config
  }
}

export default nextConfig
