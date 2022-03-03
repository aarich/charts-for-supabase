import { useTheme } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import { VictoryThemeDefinition } from 'victory-core';

export const useStatusColor = (status: EvaStatus = 'primary') =>
  useTheme()[`color-${status}-default`];

export const useTextColor = (status: EvaStatus = 'basic') =>
  useTheme()[`text-${status}-color`];

export const useBackgroundColor = (level = 1) =>
  useTheme()[`background-basic-color-${level}`];

export const useChartTheme = (): VictoryThemeDefinition => {
  const evaTheme = useTheme();
  const borderColor = evaTheme['border-basic-color-4'];
  const textColor = useTextColor();
  const primaryColor = useStatusColor();
  return {
    axis: {
      style: {
        grid: { stroke: borderColor, strokeWidth: 1.5 },
        axis: { stroke: textColor },
        tickLabels: { fill: textColor },
      },
    },
    line: {
      animate: true,
      style: {
        data: { stroke: primaryColor, strokeWidth: 3 },
        labels: { fill: textColor, fontSize: 10, color: textColor },
      },
    },
  };
};
