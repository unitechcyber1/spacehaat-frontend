/**
 * Client: POST to our Next route `/api/user/enquiry` (includes cookies).
 */

const JSON_HDR = { "Content-Type": "application/json" };

export class UserEnquiryError extends Error {
  readonly status: number;
  readonly needLogin: boolean;

  constructor(message: string, status: number, needLogin: boolean) {
    super(message);
    this.name = "UserEnquiryError";
    this.status = status;
    this.needLogin = needLogin;
  }
}

export async function submitUserEnquiry(
  body: Record<string, unknown>,
): Promise<void> {
  const res = await fetch("/api/user/enquiry", {
    method: "POST",
    credentials: "include",
    headers: JSON_HDR,
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as {
    message?: string;
    need_login?: boolean;
  };

  if (!res.ok) {
    throw new UserEnquiryError(
      typeof data.message === "string" ? data.message : `Enquiry failed (HTTP ${res.status}).`,
      res.status,
      data.need_login === true || res.status === 401,
    );
  }
}
