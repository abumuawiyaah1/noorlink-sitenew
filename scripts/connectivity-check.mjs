#!/usr/bin/env node
/**
 * End-to-end connectivity audit for NoorLink plans API.
 * Run: node scripts/connectivity-check.mjs
 */

const API_BASE =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

const COUNTRIES = ["usa", "france", "turkey", "saudi-arabia", "japan"];

const ROUTES = [
  { label: "Home", path: "/" },
  { label: "Plans USA", path: "/plans/usa" },
  { label: "Plans France", path: "/plans/france" },
  { label: "Hajj Umrah", path: "/hajj-umrah" },
  { label: "Checkout", path: "/checkout" },
  { label: "Destinations", path: "/destinations" },
];

function plansUrl(countryId) {
  return `${API_BASE}/api/v1/plans?country_id=${encodeURIComponent(countryId)}`;
}

async function pingPlans(countryId) {
  const url = plansUrl(countryId);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    const text = await res.text();
    let payload = null;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }

    const plans = payload?.plans ?? [];
    const hasFormatted = plans.every(
      (p) =>
        p?.formattedPriceParts?.dollars != null &&
        p?.formattedPriceParts?.cents != null,
    );

    return {
      countryId,
      url,
      ok: res.ok && plans.length > 0 && hasFormatted,
      status: res.status,
      planCount: plans.length,
      hasFormatted,
      error: res.ok
        ? plans.length === 0
          ? "Empty plans array"
          : hasFormatted
            ? null
            : "Missing formattedPriceParts"
        : text.slice(0, 200),
    };
  } catch (err) {
    return {
      countryId,
      url,
      ok: false,
      status: null,
      planCount: 0,
      hasFormatted: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function pingFrontend(baseUrl, path) {
  const url = `${baseUrl}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { path, url, ok: res.ok, status: res.status };
  } catch (err) {
    return {
      path,
      url,
      ok: false,
      status: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function main() {
  console.log("=== NoorLink System Connectivity Check ===\n");
  console.log(`API base: ${API_BASE}`);

  const apiResults = [];
  for (const country of COUNTRIES) {
    const result = await pingPlans(country);
    apiResults.push(result);
    const status = result.ok ? "OK" : "FAIL";
    console.log(
      `[API ${status}] ${country} → ${result.status ?? "N/A"} (${result.planCount} plans) ${result.url}`,
    );
    if (!result.ok) console.log(`         error: ${result.error}`);
  }

  const frontendBase = process.env.FRONTEND_URL ?? "http://127.0.0.1:3000";
  console.log(`\nFrontend base: ${frontendBase}`);
  const routeResults = [];
  for (const route of ROUTES) {
    const result = await pingFrontend(frontendBase, route.path);
    routeResults.push({ ...route, ...result });
    const status = result.ok ? "OK" : "FAIL";
    console.log(`[Route ${status}] ${route.label} → ${result.status ?? "N/A"} ${result.url}`);
    if (result.error) console.log(`         error: ${result.error}`);
  }

  const apiOk = apiResults.some((r) => r.ok);
  const priceOk = apiResults.some((r) => r.ok && r.hasFormatted);
  const routesOk = routeResults.filter((r) =>
    ["/plans/usa", "/hajj-umrah", "/"].includes(r.path),
  ).every((r) => r.ok);

  console.log("\n=== Summary ===");
  console.log(`API to Frontend Communication: ${apiOk ? "SUCCESS" : "FAIL"}`);
  console.log(`Dynamic Price Updates: ${priceOk ? "SUCCESS" : "FAIL"}`);
  console.log(`Core Routes Reachable: ${routesOk ? "SUCCESS" : "FAIL"}`);

  process.exit(apiOk && priceOk ? 0 : 1);
}

main();
