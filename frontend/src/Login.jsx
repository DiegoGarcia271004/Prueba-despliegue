import { useState } from 'react'

const API = '/api'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include' es necesario para que el browser
        // acepte y guarde la cookie HttpOnly que devuelve el backend
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'Credenciales incorrectas')
      }

      // El JWT llegó como cookie HttpOnly — el browser lo guarda
      // automáticamente. Solo guardamos el username en estado local.
      onLogin({ username })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo / marca */}
        <div style={styles.brand}>
          <span style={styles.brandIcon}>▣</span>
          <span style={styles.brandName}>WarehouseInventory</span>
        </div>

        <h1 style={styles.heading}>Iniciar sesión</h1>
        <p style={styles.sub}>Ingresá tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Usuario</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div style={styles.error}>
              <span style={styles.errorDot}>●</span> {error}
            </div>
          )}

          <button
            type="submit"
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p style={styles.hint}>
          Backend: <code style={styles.code}>{API}/auth/login</code>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'var(--bg)',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '40px 36px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
  },
  brandIcon: {
    fontSize: '22px',
    color: 'var(--accent)',
  },
  brandName: {
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '-0.3px',
    color: 'var(--text)',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 600,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
    marginBottom: '6px',
  },
  sub: {
    color: 'var(--muted)',
    fontSize: '13px',
    marginBottom: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '7px',
    padding: '10px 13px',
    color: 'var(--text)',
    fontSize: '14px',
    fontFamily: 'var(--font)',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  btn: {
    marginTop: '8px',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    padding: '11px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  error: {
    background: '#2d1515',
    border: '1px solid #7f1d1d',
    borderRadius: '7px',
    padding: '10px 13px',
    color: 'var(--error)',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorDot: {
    fontSize: '8px',
  },
  hint: {
    marginTop: '24px',
    color: 'var(--muted)',
    fontSize: '11px',
    textAlign: 'center',
  },
  code: {
    fontFamily: 'var(--mono)',
    background: 'var(--bg)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    color: 'var(--accent)',
  },
}