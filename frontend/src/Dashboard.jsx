import { useState } from 'react'

const API = '/api'

export default function Dashboard({ user, onLogout }) {
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await fetch(`${API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setLoading(false)
      onLogout()
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <header style={styles.header}>
          <div style={styles.brand}>
            <span style={styles.brandIcon}>▣</span>
            <span style={styles.brandName}>WarehouseInventory</span>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.userBadge}>{user.username}</span>
            <button
              style={{ ...styles.logoutBtn, opacity: loading ? 0.6 : 1 }}
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? 'Saliendo...' : 'Cerrar sesión'}
            </button>
          </div>
        </header>

        {/* Success banner */}
        <div style={styles.banner}>
          <span style={styles.bannerIcon}>✓</span>
          <div>
            <p style={styles.bannerTitle}>Conexión exitosa</p>
            <p style={styles.bannerSub}>
              El JWT llegó como cookie HttpOnly — el browser lo guarda automáticamente en cada request.
            </p>
          </div>
        </div>

        {/* Info cards */}
        <div style={styles.grid}>
          <InfoCard
            label="Usuario autenticado"
            value={user.username}
            mono
          />
          <InfoCard
            label="Autenticación"
            value="JWT en cookie HttpOnly"
          />
          <InfoCard
            label="CSRF"
            value="Deshabilitado (perfil dev)"
          />
          <InfoCard
            label="Backend"
            value={`${window.location.origin}/api`}
            mono
          />
        </div>

        {/* Swagger link */}
        <div style={styles.swaggerBox}>
          <p style={styles.swaggerText}>
            Explorá todos los endpoints disponibles en Swagger:
          </p>
          <a
            href="/swagger-ui/index.html"
            target="_blank"
            rel="noreferrer"
            style={styles.swaggerLink}
          >
            Abrir Swagger UI →
          </a>
        </div>

      </div>
    </div>
  )
}

function InfoCard({ label, value, mono }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardLabel}>{label}</p>
      <p style={{ ...styles.cardValue, fontFamily: mono ? 'var(--mono)' : 'var(--font)' }}>
        {value}
      </p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    padding: '0 0 48px',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    borderBottom: '1px solid var(--border)',
    marginBottom: '32px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  brandIcon: {
    fontSize: '20px',
    color: 'var(--accent)',
  },
  brandName: {
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '-0.3px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userBadge: {
    background: 'var(--accent-dim)',
    color: 'var(--accent)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '7px',
    color: 'var(--muted)',
    padding: '6px 13px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  banner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    background: '#0d2b1e',
    border: '1px solid #166534',
    borderRadius: '10px',
    padding: '20px 24px',
    marginBottom: '28px',
  },
  bannerIcon: {
    color: 'var(--success)',
    fontSize: '20px',
    marginTop: '1px',
    flexShrink: 0,
  },
  bannerTitle: {
    color: 'var(--success)',
    fontWeight: 600,
    fontSize: '15px',
    marginBottom: '4px',
  },
  bannerSub: {
    color: '#6ee7b7',
    fontSize: '13px',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
    marginBottom: '28px',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '9px',
    padding: '16px 18px',
  },
  cardLabel: {
    color: 'var(--muted)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  cardValue: {
    color: 'var(--text)',
    fontSize: '13px',
    fontWeight: 500,
    wordBreak: 'break-all',
  },
  swaggerBox: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '9px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  swaggerText: {
    color: 'var(--muted)',
    fontSize: '13px',
  },
  swaggerLink: {
    color: 'var(--accent)',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
  },
}