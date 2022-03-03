import {
  Datepicker,
  DatepickerProps,
  NativeDateService,
} from '@ui-kitten/components';
import Label from './Label';

const formatDateService = new NativeDateService('en', {
  format: 'MMM D, YYYY',
});

type Props = {
  description?: string;
} & Omit<DatepickerProps, 'dateService'>;

const DEFAULT_MIN = new Date(1900, 0);
const DEFAULT_MAX = new Date(2500, 5);

const DatePicker = ({
  description,
  label,
  placeholder = 'Pick a date',
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  ...restProps
}: Props) => {
  let labelElement = null;
  if (description && typeof label === 'string') {
    labelElement = <Label label={label} tooltip={description} />;
  }

  const labelForDatepicker = labelElement ? undefined : label;

  return (
    <>
      {labelElement}
      <Datepicker
        placeholder={placeholder}
        label={labelForDatepicker}
        dateService={formatDateService}
        min={min}
        max={max}
        {...restProps}
      />
    </>
  );
};

export default DatePicker;
