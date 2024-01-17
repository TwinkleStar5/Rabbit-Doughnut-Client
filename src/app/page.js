"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push, isReady } = useRouter();
  if (isReady) push("/home");
  return null;
}
