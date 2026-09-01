self.addEventListener("push", (event) => {
  const payload = event.data
    ? event.data.json()
    : { title: "Bare Minimum Planner", body: "You have a task reminder." };

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/BMP_logo.svg",
      badge: "/BMP_logo.svg",
      data: { url: payload.url || "/dashboard" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
