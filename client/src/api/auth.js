export const loginWithGoogle = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};

export const getMe = async () => {
  const res = await fetch("http://localhost:4000/api/auth/me", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No authenticated");
  return res.json();
};
