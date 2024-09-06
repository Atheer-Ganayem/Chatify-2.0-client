export type Res = {
  ok: boolean;
  message: string;
  code: number;
};

export interface AuthRes extends Res {
  validationResult?: ValidationResult | null;
  email?: string;
  password?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: ("name" | "email" | "password" | "confirmPassword" | "file")[];
  messages: string[];
}

export function notFound(): Res {
  return { ok: false, message: "Resource not found", code: 404 };
}

export function notAuthenticated(): Res {
  return { ok: false, message: "Not authenticated", code: 403 };
}

export function notAuthorized(): Res {
  return { ok: false, message: "Not authorized", code: 401 };
}

export function invalidClientInputs(): Res {
  return { ok: false, message: "Invalid inputs", code: 422 };
}

export function serverSideError(): Res {
  return { ok: false, message: "An error has occurred, please try again later.", code: 500 };
}
