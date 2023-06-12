export default function useAuth() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = localStorage.getItem("token-name");

  if (token) {
    return true;
  }
  return false;
}