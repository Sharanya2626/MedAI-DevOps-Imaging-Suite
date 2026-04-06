import {
  HomeIcon,
  CpuChipIcon,
  DocumentChartBarIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  SignalIcon,
  Squares2X2Icon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Dashboard', path: '/', icon: HomeIcon },
  { label: 'CNN Models', path: '/cnn-models', icon: CpuChipIcon },
  { label: 'X-ray Analysis', path: '/xray-analysis', icon: DocumentChartBarIcon },
  { label: 'Metrics', path: '/metrics', icon: ChartBarIcon },
  { label: 'Explainable AI', path: '/explainable-ai', icon: SparklesIcon },
  { label: 'CI Pipeline', path: '/ci-pipeline', icon: ArrowPathIcon },
  { label: 'CD Deploy', path: '/cd-deploy', icon: CloudArrowUpIcon },
  { label: 'Monitoring', path: '/monitoring', icon: SignalIcon },
  { label: 'Model Registry', path: '/model-registry', icon: Squares2X2Icon },
  { label: 'Data Drift', path: '/data-drift', icon: ShieldCheckIcon },
  { label: 'User Feedback', path: '/user-feedback', icon: ChatBubbleBottomCenterTextIcon },
  { label: 'Settings', path: '/settings', icon: Cog6ToothIcon }
];

export default navItems;
