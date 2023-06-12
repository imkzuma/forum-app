import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token-name");

    if (token) {
      localStorage.removeItem("token-name");
      router.replace("/auth")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}