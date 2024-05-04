/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"img.clerk.com"
            }
        ]
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
      }
};

export default nextConfig;
