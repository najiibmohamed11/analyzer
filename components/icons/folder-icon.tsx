export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <filter id="folder-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="paper-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
        <linearGradient id="folder-front-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDFDFD" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>

      {/* Back part of folder */}
      <path
        d="M20 60 C20 45 30 45 40 45 L80 45 C90 45 95 45 100 55 L110 65 C115 70 120 70 130 70 L160 70 C175 70 180 75 180 90 L180 150 C180 165 170 170 160 170 L40 170 C25 170 20 160 20 150 Z"
        fill="#E0E0E0"
      />

      {/* Paper inside */}
      <path
        d="M40 55 L160 55 L160 140 L40 140 Z"
        fill="url(#paper-gradient)"
        transform="rotate(-2 100 100)"
        className="drop-shadow-sm"
      />
      {/* Paper fold/corner */}
      <path d="M130 55 L160 85 L160 55 Z" fill="#F5F5F5" transform="rotate(-2 100 100)" />

      {/* Front part of folder */}
      <path
        d="M20 90 C20 75 30 75 40 75 L180 75 C190 75 195 80 195 95 L190 160 C188 175 175 180 160 180 L40 180 C25 180 15 170 10 160 L15 95 C16 80 20 90 20 90 Z"
        fill="url(#folder-front-gradient)"
        filter="url(#folder-shadow)"
        stroke="#E5E5E5"
        strokeWidth="1"
      />
    </svg>
  )
}
