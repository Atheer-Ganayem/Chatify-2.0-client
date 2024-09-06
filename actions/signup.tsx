"use server";

import User from "@/models/User";
import { uploadFile } from "@/utils/aws";
import connectDB from "@/utils/connectDB";
import { AuthRes, Res, ValidationResult } from "@/utils/http-helpers";
import bcrypt from "bcryptjs";

export async function signup(_: Res, formData: FormData): Promise<AuthRes> {
  try {
    const data = extractData(formData);
    const validationResult = validate(data);
    if (!validationResult.ok) {
      return { ok: false, code: 422, message: "", validationResult };
    }

    await connectDB();
    const existingUser = await User.findOne({ email: data.email }).select("_id");
    if (existingUser) {
      return { ok: false, code: 422, message: "Email already in use, choose another email." };
    }

    const fileName = await uploadFile(data.avatar as File);

    const hashedPw = await bcrypt.hash(data.password as string, 12);
    await User.create({ name: data.name, email: data.email, password: hashedPw, avatar: fileName });

    return {
      ok: true,
      code: 201,
      message: "Account created successfully.",
      email: data.email as string,
      password: data.password as string,
    };
  } catch (error) {
    return { ok: false, code: 500, message: "Internal server error, please try again later." };
  }
}

function extractData(formData: FormData): Data {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;
  const avatar = formData.get("file") as File;

  return { name, email, password, confirmPassword, avatar };
}

interface Data {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  avatar: File | null;
}

function validate({ name, confirmPassword, email, password, avatar }: Data): ValidationResult {
  const result: ValidationResult = { ok: true, errors: [], messages: [] };
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length < 3) {
    result.errors.push("name");
    result.messages.push("Username must be at least 3 characters long.");
  }
  if (!password || password.length < 6) {
    result.errors.push("password");
    result.messages.push("Password must be at least 6 characters long.");
  }
  if (!confirmPassword || password !== confirmPassword) {
    result.errors.push("confirmPassword");
    result.messages.push("Passwords don't match.");
  }
  if (!email || !emailRegex.test(email)) {
    result.errors.push("email");
    result.messages.push("Invalid email, please enter a valid email address.");
  }
  if (!avatar || avatar.size === 0 || avatar.type.split("/")[0] !== "image") {
    result.errors.push("file");
    result.messages.push("Invalid image type.");
  }

  result.ok = result.errors.length === 0;
  return result;
}
