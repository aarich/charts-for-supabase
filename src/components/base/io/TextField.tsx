import { Input, InputProps, Text } from '@ui-kitten/components';
import { forwardRef } from 'react';
import Label from './Label';

type Props = {
  tooltip?: string;
  label?: string;
  error?: string;
} & InputProps;

export default forwardRef<Input, Props>(
  ({ tooltip, label: labelProp, error, ...props }, ref) => {
    const label =
      tooltip && labelProp ? (
        <Label tooltip={tooltip} label={labelProp} />
      ) : (
        labelProp
      );
    return (
      <>
        <Input {...props} label={label} ref={ref} />
        {error ? <Text status="danger">{error}</Text> : null}
      </>
    );
  }
);
