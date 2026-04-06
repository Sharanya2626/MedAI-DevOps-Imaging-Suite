export const getMonitoring = async (req, res) => {
  res.json({
    uptime: 99.94,
    latency: 120,
    alerts: 2,
    resources: [
      { metric: 'CPU', value: 48 },
      { metric: 'Memory', value: 63 },
      { metric: 'GPU', value: 35 }
    ]
  });
};
