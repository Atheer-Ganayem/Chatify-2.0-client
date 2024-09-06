"use client";

import Link from "next/link";

function SwitchAuthFooter({ currentMode }: { currentMode: string }) {
  return (
    <div>
      {currentMode === "login" ? (
        <p>
          {"Don't"} have an account ?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Create a new account
          </Link>
        </p>
      ) : (
        <p>
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}

export default SwitchAuthFooter;
