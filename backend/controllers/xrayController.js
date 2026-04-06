import XrayCase from '../models/XrayCase.js';

const defaultCases = {
  cases: [
    { id: 'case-001', caseId: 'PA-1024', prediction: 'Pneumonia', confidence: 95, category: 'abnormal' },
    { id: 'case-002', caseId: 'PA-1029', prediction: 'Normal', confidence: 88, category: 'normal' },
    { id: 'case-003', caseId: 'PA-1033', prediction: 'Cardiomegaly', confidence: 91, category: 'abnormal' }
  ]
};

export const getXrayAnalysis = async (req, res) => {
  const records = await XrayCase.find().lean();
  res.json({ cases: records.length ? records : defaultCases.cases });
};
