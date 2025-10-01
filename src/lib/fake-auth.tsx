"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { 
  id: string; 
  name: string; 
  email: string; 
  role: "admin" | "viewer" 
};

const AuthContext = createContext<{
  user: User | null;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

export function FakeAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const raw = localStorage.getItem("cl_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        localStorage.removeItem("cl_user");
      }
    }
  }, []);

  function signIn() {
    const u: User = {
      id: crypto.randomUUID(),
      name: "Admin",
      email: "admin@city.gov",
      role: "admin"
    };
    localStorage.setItem("cl_user", JSON.stringify(u));
    setUser(u);
  }

  function signOut() {
    localStorage.removeItem("cl_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within FakeAuthProvider");
  }
  return context;
}
