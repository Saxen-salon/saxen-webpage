export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-background)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-6)",
        }}
      >
        {/* S4: no rounded corners — use a hairline square indicator */}
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "1px solid var(--color-border)",
            borderTopColor: "var(--color-accent-500)",
            borderRadius: 0,
            animation: "saxen-spin 600ms linear infinite",
          }}
        />
        <span className="sr-only">Indlæser…</span>
      </div>

      <style>{`
        @keyframes saxen-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes saxen-spin { to { transform: none; } }
        }
      `}</style>
    </div>
  );
}
