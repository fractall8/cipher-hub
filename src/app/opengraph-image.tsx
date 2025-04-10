import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const colors = {
  primaryTransparent: 'rgba(11, 92, 0, 0.2)',
  background: 'rgb(255, 255, 255)',
  primary: 'rgb(36, 197, 95)',
};

export default async function Image() {
  const InterBold = await readFile(join(process.cwd(), 'public/InterBold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingInline: '1rem',
          backgroundImage: `linear-gradient(${colors.primaryTransparent} 1px, transparent 1px), linear-gradient(to right, ${colors.primaryTransparent} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundColor: colors.background,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
            <circle cx="16.5" cy="7.5" r=".5" fill="#fff" />
          </svg>
          <h1
            style={{
              fontSize: '3.75rem',
              fontWeight: '700',
              letterSpacing: '-0.025em',
              color: colors.primary,
            }}
          >
            Cipher Hub
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: InterBold, style: 'normal', weight: 700 }],
    },
  );
}
