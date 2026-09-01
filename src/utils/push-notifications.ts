import { savePushSubscription } from "@/api/auth";

type ReminderSetupResult = "enabled" | "denied" | "unsupported" | "unconfigured";

const urlBase64ToUint8Array = (value: string) => {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, (character) => character.charCodeAt(0));
};

export const enableTaskReminders = async (): Promise<ReminderSetupResult> => {
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  if (!publicKey) return "unconfigured";
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported";
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "denied";

  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  }

  await savePushSubscription(subscription.toJSON());
  return "enabled";
};
