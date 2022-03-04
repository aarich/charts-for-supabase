import { MOCK_DATA, MyConstants } from '../../utils';
import { useAppSelector } from '../store';

export const useDashboard = () => {
  const dashboard = useAppSelector((state) => state.dashboard);
  if (MyConstants.isScreenshotting) {
    return MOCK_DATA.dashboard;
  }
  return dashboard;
};

export const useDashboardRow = (row: number) => useDashboard().rows[row];
