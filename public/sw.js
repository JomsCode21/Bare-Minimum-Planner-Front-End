self.addEventListener("push", (event) => {
  const payload = event.data ? event.data.json() : {};
  const title = payload.title || "Bare Minimum Planner";
  const options = {
    body: payload.body || "A task is almost due.",
    icon: "/BMP_logo.svg",
    badge: "/BMP_logo.svg",
    data: { url: payload.url || "/dashboard" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
