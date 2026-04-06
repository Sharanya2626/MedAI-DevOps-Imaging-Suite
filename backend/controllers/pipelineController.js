export const getCIPipeline = async (req, res) => {
  res.json({
    stages: [
      { name: 'Build', status: 'Success', detail: 'Container and artifact build completed.' },
      { name: 'Test', status: 'Success', detail: 'Unit and integration tests passed.' },
      { name: 'Validate', status: 'Success', detail: 'Validation pipeline checks cleared.' },
      { name: 'Package', status: 'Success', detail: 'Package created and tagged.' }
    ],
    runs: [
      { id: 'run-998', status: 'Success', duration: '12m 20s', triggered: 'Auto', steps: [] },
      { id: 'run-997', status: 'Success', duration: '11m 47s', triggered: 'Manual', steps: [] }
    ]
  });
};
