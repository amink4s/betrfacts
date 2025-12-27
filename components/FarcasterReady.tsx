"use client";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function FarcasterReady() {
  useEffect(() => {
    (async () => {
      try {
        await sdk.actions.ready();
      } catch (e) {
        console.error("Farcaster ready() failed", e);
      }
    })();
  }, []);
  return null;
}
