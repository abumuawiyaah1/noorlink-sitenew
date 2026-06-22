"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

type DashboardPlan = {
  status: string;
  planName: string;
  dataTotal: number;
  dataLeft: number;
  expiry: string;
  color: string;
};

const DEMO_PLANS: Record<string, DashboardPlan> = {
  "NL-882910": {
    status: "Active",
    planName: "USA Travel Pack",
    dataTotal: 10,
    dataLeft: 7.5,
    expiry: "Feb 28, 2026",
    color: "#10B981",
  },
};

export function ModernDashboardPage() {
  const [email, setEmail] = useState("user@demo.com");
  const [orderId, setOrderId] = useState("NL-882910");
  const [plan, setPlan] = useState<DashboardPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const match = DEMO_PLANS[orderId.trim()];
    if (!match) {
      setError("Order not found. Check your order ID and try again.");
      setPlan(null);
      return;
    }

    setPlan(match);
  }

  return (
    <>
      <SiteHeader logoClassName="logo" />

      {!plan ? (
        <div id="login-view">
          <div className="login-card">
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>🔒</div>
            <h1>Manage eSIM</h1>
            <p>Enter your email and order ID to view your data usage and manage your plan.</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="dashboard-email">Email Address</label>
                <input
                  id="dashboard-email"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="dashboard-order">Order ID</label>
                <input
                  id="dashboard-order"
                  type="text"
                  className="input-field"
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  placeholder="NL-123456"
                  required
                />
              </div>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-btn">
                View My eSIM
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container" style={{ padding: "2rem 0" }}>
          <div className="login-card">
            <h1>{plan.planName}</h1>
            <p style={{ color: plan.color, fontWeight: 700 }}>{plan.status}</p>
            <p>
              Data remaining: {plan.dataLeft} GB / {plan.dataTotal} GB
            </p>
            <p>Expires: {plan.expiry}</p>

            <button
              type="button"
              className="login-btn"
              onClick={() => setQrOpen((open) => !open)}
            >
              {qrOpen ? "Hide QR Code" : "Show QR Code"}
            </button>

            {qrOpen && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div
                  style={{
                    width: 180,
                    height: 180,
                    margin: "0 auto",
                    background: "#111",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 12,
                  }}
                >
                  QR
                </div>
              </div>
            )}

            <button
              type="button"
              className="login-btn"
              style={{ marginTop: 16, background: "transparent", color: "inherit" }}
              onClick={() => setPlan(null)}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
