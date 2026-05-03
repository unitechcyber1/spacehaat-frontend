/**
 * Lead submissions via axios. URL and timeout come from env — see `.env.example`.
 */

import axios from "axios";

import {
  resolveLeadsSubmitTimeoutMs,
  resolveLeadsSubmitUrl,
} from "@/services/env-config";

export { resolveLeadsSubmitUrl } from "@/services/env-config";

export async function submitLead(body: Record<string, unknown>): Promise<void> {
  await axios.post(resolveLeadsSubmitUrl(), body, {
    timeout: resolveLeadsSubmitTimeoutMs(),
    headers: { "Content-Type": "application/json" },
  });
}
