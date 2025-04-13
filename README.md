This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Keys Setup

This project requires environment variables to be set up for certain features to work correctly:

### OpenAI API Key

For the AI fortune telling feature to work, you need to set up an OpenAI API key:

1. Create a `.env.local` file in the root directory if it doesn't exist
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Restart the development server after adding the key

You can obtain an API key from [OpenAI's platform](https://platform.openai.com/api-keys).

## Features

- MBTI personality test
- IQ test
- Love compatibility test
- AI-powered fortune telling (requires OpenAI API key)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

When deploying to Vercel, make sure to add the `OPENAI_API_KEY` environment variable in your Vercel project settings.
