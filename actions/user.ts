"use server";

import User from "@/models/User";
import authOptions from "@/utils/authOptions";
import { deleteFile, uploadFile } from "@/utils/aws";
import { notAuthenticated, notFound, Res, serverSideError } from "@/utils/http-helpers";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

interface AvatarRes extends Res {
  newAvatar?: string;
}

export async function updateAvatar(_: Res, formData: FormData): Promise<AvatarRes> {
  try {
    const avatar = formData.get("file") as File | null;
    if (!avatar || avatar.size === 0 || avatar.type.split("/")[0] !== "image") {
      return { ok: false, code: 422, message: "Invalid avatar type. Only images are allowed." };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }
    const user = await User.findById(session.user.id).select("avatar");
    if (!user) {
      return notFound();
    }

    const newAvtarFilename = await uploadFile(avatar);
    deleteFile(user.avatar);

    await User.findByIdAndUpdate(session.user.id, { $set: { avatar: newAvtarFilename } });

    return {
      ok: true,
      code: 200,
      message: "Avatar updated successfully.",
      newAvatar: newAvtarFilename,
    };
  } catch (error) {
    return serverSideError();
  }
}

interface UpdateUsernameRes extends Res {
  name?: string;
}

export async function updateUsername(_: Res, formData: FormData): Promise<UpdateUsernameRes> {
  try {
    const newUsername = formData.get("name");

    if (!newUsername || typeof newUsername !== "string" || newUsername.length < 3) {
      return { ok: false, code: 422, message: "Username must be at least 3 characters." };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }

    await User.findByIdAndUpdate(session.user.id, { $set: { name: newUsername } });

    return {
      ok: true,
      code: 200,
      message: "Username has been updated successfully.",
      name: newUsername,
    };
  } catch (error) {
    return serverSideError();
  }
}

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
interface UpdateEmailRes extends Res {
  email?: string;
}

export async function updateEmail(_: Res, formData: FormData): Promise<UpdateEmailRes> {
  try {
    const newEmail = formData.get("email");
    if (!newEmail || typeof newEmail !== "string" || !emailRegex.test(newEmail)) {
      return { ok: false, code: 422, message: "Please enter a valid email." };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }

    const existingEmail = await User.findOne({ email: newEmail }).select("_id");
    if (existingEmail) {
      return { ok: false, code: 422, message: "Email already in use. Please chose another email." };
    }

    await User.findByIdAndUpdate(session.user.id, { $set: { email: newEmail } });

    return {
      ok: true,
      code: 200,
      message: "Email has been updated successfully.",
      email: newEmail,
    };
  } catch (error) {
    return serverSideError();
  }
}

export async function updatePassword(_: Res, formData: FormData): Promise<Res> {
  try {
    const data = extactPasswordData(formData);
    const validationResult = validatePassworData(data);
    if (validationResult) {
      return { ok: false, code: 422, message: validationResult };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }

    const user = await User.findById(session.user.id).select("password");
    if (!user) {
      return notFound();
    }

    const isPasswordCorrect = await bcrypt.compare(data.currentPassword as string, user.password);
    if (!isPasswordCorrect) {
      return { ok: false, code: 422, message: "Inccorect password." };
    }

    const hashedPw = await bcrypt.hash(data.currentPassword as string, 12);

    await User.findByIdAndUpdate(session.user.id, { $set: { password: hashedPw } });

    return { ok: true, code: 200, message: "Password has been updated successfully." };
  } catch (error) {
    return serverSideError();
  }
}

interface PasswordData {
  currentPassword: FormDataEntryValue | null;
  newPassword: FormDataEntryValue | null;
  confirmNewPassword: FormDataEntryValue | null;
}

function extactPasswordData(formData: FormData): PasswordData {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");

  return { currentPassword, newPassword, confirmNewPassword };
}

function validatePassworData({
  confirmNewPassword,
  currentPassword,
  newPassword,
}: PasswordData): string {
  if (
    !newPassword ||
    !confirmNewPassword ||
    !currentPassword ||
    typeof newPassword !== "string" ||
    typeof currentPassword !== "string" ||
    typeof confirmNewPassword !== "string"
  ) {
    return "Invalid input. Please make sure all fields are filled.";
  } else if (newPassword !== confirmNewPassword) {
    return "New password and confirm new password must match.";
  }

  return "";
}
