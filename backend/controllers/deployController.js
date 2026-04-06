export const getDeployments = async (req, res) => {
  res.json({
    environment: 'Production',
    description: 'Stable model deployment for clinical imaging inference.',
    lastVersion: 'release-2.8.1',
    lastDeployed: '2026-04-05 17:32',
    logs: ['Deployment started', 'Container pushed', 'Verification complete', 'Traffic cutover finished'],
    rollbackAvailable: true
  });
};
