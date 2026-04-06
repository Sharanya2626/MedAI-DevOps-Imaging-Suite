import Feedback from '../models/Feedback.js';

const defaultFeedback = {
  reviews: [
    { id: 'fb-001', author: 'Dr. Alvarez', rating: 5, comment: 'The AI guidance is precise and saves hours of review time.', tags: ['high priority', 'usability'] },
    { id: 'fb-002', author: 'Radiology Tech', rating: 4, comment: 'Model performance is strong, but inference logs can be more detailed.', tags: ['logging', 'accuracy'] },
    { id: 'fb-003', author: 'Admin', rating: 4, comment: 'Pipeline reporting is clear and reliable.', tags: ['pipeline', 'reporting'] }
  ]
};

export const getFeedback = async (req, res) => {
  const records = await Feedback.find().lean();
  res.json({ reviews: records.length ? records : defaultFeedback.reviews });
};
