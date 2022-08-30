export const showRoutes = (app) => {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        };
      }
    })
    .filter((item) => item !== undefined);

  console.table(availableRoutes);
};

export const isDevelopment = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
};
