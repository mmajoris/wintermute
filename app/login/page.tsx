"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/live";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("AUTHENTICATION FAILED");
        setLoading(false);
      } else if (result?.ok) {
        window.location.href = callbackUrl;
      }
    } catch {
      setError("SYSTEM ERROR");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="term-field-group">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="USERNAME"
          className="term-input"
        />

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="PASSWORD"
          className="term-input"
        />
      </div>

      {error && (
        <div className="term-error">
          {error}
        </div>
      )}

      <div className="term-actions">
        <button type="submit" disabled={loading} className="term-btn">
          {loading ? "WAIT..." : "LOGIN"}
        </button>
      </div>
    </form>
  );
}

function LoginFormFallback() {
  return (
    <div className="term-field-group">
      <div className="term-input" style={{ opacity: 0.3 }}>&nbsp;</div>
      <div className="term-input" style={{ opacity: 0.3 }}>&nbsp;</div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="term-root">
      <style>{`
        :root {
          --t: #5bc4b5;
          --t2: rgba(91, 196, 181, 0.18);
          --t3: rgba(91, 196, 181, 0.06);
          --bg: #0b1015;
        }

        .term-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(91, 196, 181, 0.02) 0px,
              rgba(91, 196, 181, 0.02) 1px,
              transparent 1px,
              transparent 3px
            );
          position: relative;
          overflow: hidden;
          font-family: "Courier New", Courier, monospace;
          padding: 2rem;
        }

        .term-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 40%, rgba(91,196,181,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Main container */
        .term-box {
          position: relative;
          width: 100%;
          max-width: 480px;
          border: 1.5px dashed var(--t2);
          padding: 3rem 2.5rem 2.5rem;
        }

        .term-box::before,
        .term-box::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
        }
        .term-box::before {
          top: -1px; left: -1px;
          border-top: 1.5px solid var(--t);
          border-left: 1.5px solid var(--t);
          opacity: 0.4;
        }
        .term-box::after {
          bottom: -1px; right: -1px;
          border-bottom: 1.5px solid var(--t);
          border-right: 1.5px solid var(--t);
          opacity: 0.4;
        }

        /* Logo area */
        .term-logo {
          text-align: center;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--t2);
        }

        .term-logo-glyph {
          font-size: 28px;
          letter-spacing: 0.35em;
          color: var(--t);
          opacity: 0.25;
          line-height: 1;
          margin-bottom: 8px;
        }

        .term-logo-name {
          font-size: 13px;
          letter-spacing: 0.35em;
          color: var(--t);
          opacity: 0.35;
          font-weight: 400;
        }

        /* Title + subtitle */
        .term-heading {
          margin-bottom: 1.8rem;
        }

        .term-sub {
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--t);
          opacity: 0.3;
          text-transform: uppercase;
        }

        .term-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .term-input {
          width: 100%;
          padding: 11px 14px;
          background: transparent;
          border: 1.5px solid var(--t2);
          color: var(--t);
          font-family: "Courier New", Courier, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .term-input::placeholder {
          color: var(--t);
          opacity: 0.25;
        }

        .term-input:focus {
          border-color: var(--t);
          box-shadow: 0 0 10px var(--t3), inset 0 0 10px var(--t3);
        }

        /* Error */
        .term-error {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--t);
          opacity: 0.8;
          margin-bottom: 1rem;
          animation: blink 1.5s step-end infinite;
        }

        /* Actions */
        .term-actions {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .term-btn {
          display: inline-block;
          padding: 10px 24px;
          background: transparent;
          border: 1.5px solid var(--t2);
          color: var(--t);
          font-family: "Courier New", Courier, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;
        }

        .term-btn:hover:not(:disabled) {
          border-color: var(--t);
          background: var(--t3);
          box-shadow: 0 0 14px var(--t3);
        }

        .term-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main container */}
      <div className="term-box">
        {/* Logo area */}
        <div className="term-logo">
          <div className="term-logo-glyph">&#9674;&#9674;&#9674;</div>
          <div className="term-logo-name">NULLTRUTH</div>
        </div>

        {/* Subtitle */}
        <div className="term-heading">
          <div className="term-sub">SECURE TERMINAL</div>
        </div>

        {/* Form */}
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
