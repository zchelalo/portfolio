import sharp from 'sharp'

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#071226"/>
      <stop offset="1" stop-color="#0a1d3c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.84" cy="0.12" r="0.55">
      <stop offset="0" stop-color="#2f6bff" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#2f6bff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#27436b" stroke-opacity="0.28" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(84 96)">
    <text fill="#7aa8ff" font-family="Ubuntu, sans-serif" font-size="30" font-weight="700">chelalo_</text>
    <text y="92" fill="#f1f6ff" font-family="Ubuntu, sans-serif" font-size="68" font-weight="700">Eduardo Saavedra</text>
    <text y="146" fill="#9db0ce" font-family="Ubuntu, sans-serif" font-size="30">Software Engineer</text>
    <text y="205" fill="#c7d6ef" font-family="Ubuntu, sans-serif" font-size="25">Backend · Data · Product delivery</text>

    <g transform="translate(0 268)" font-family="Ubuntu, sans-serif" font-size="18" fill="#c7d6ef">
      <rect width="104" height="42" rx="21" fill="#10294b" stroke="#2b4671"/>
      <text x="22" y="27">Go</text>
      <rect x="116" width="142" height="42" rx="21" fill="#10294b" stroke="#2b4671"/>
      <text x="138" y="27">TypeScript</text>
      <rect x="270" width="154" height="42" rx="21" fill="#10294b" stroke="#2b4671"/>
      <text x="292" y="27">PostgreSQL</text>
      <rect x="436" width="94" height="42" rx="21" fill="#10294b" stroke="#2b4671"/>
      <text x="458" y="27">AWS</text>
    </g>

    <text y="430" fill="#7f97b6" font-family="Ubuntu, sans-serif" font-size="21">chelalo.me</text>
  </g>

  <g transform="translate(846 128) rotate(2)" opacity="0.96">
    <rect width="268" height="330" rx="26" fill="#0b1930" stroke="#2b4671"/>
    <rect x="1" y="1" width="266" height="44" rx="25" fill="#10233f"/>
    <circle cx="26" cy="23" r="5" fill="#7aa8ff"/>
    <circle cx="44" cy="23" r="5" fill="#31517a"/>
    <circle cx="62" cy="23" r="5" fill="#31517a"/>
    <g font-family="Ubuntu, sans-serif" font-size="13" fill="#9db0ce">
      <text x="24" y="82">AGENDA</text>
      <text x="24" y="116" fill="#eaf1ff" font-size="16">09:00 · Sesión</text>
      <text x="24" y="142" fill="#6fe0bd" font-size="12">confirmada</text>
      <text x="24" y="186">EXPEDIENTE</text>
      <text x="24" y="220" fill="#eaf1ff" font-size="16">Notas y evaluación</text>
      <text x="24" y="264">REPORTES</text>
      <text x="24" y="298" fill="#eaf1ff" font-size="16">PDF · XLSX</text>
    </g>
    <line x1="24" y1="166" x2="244" y2="166" stroke="#1b3052"/>
    <line x1="24" y1="244" x2="244" y2="244" stroke="#1b3052"/>
  </g>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-default.png')
console.log('Generated public/og-default.png (1200×630).')
