import { useAppSelector } from '../store';

export const useDashboard = () => useAppSelector((state) => state.dashboard);

export const useDashboardRow = (row: number) => useDashboard().rows[row];
