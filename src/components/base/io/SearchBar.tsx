import { Input, InputProps } from '@ui-kitten/components';
import ActivityIndicator from '../ActivityIndicator';

type Props = {
  loading: boolean;
} & InputProps;

const SearchBar = ({ loading, ...otherProps }: Props) => {
  return (
    <Input
      placeholder="Search here..."
      accessoryRight={
        loading ? () => <ActivityIndicator /> : otherProps.accessoryRight
      }
      returnKeyLabel="Search"
      returnKeyType="search"
      clearButtonMode="always"
      {...otherProps}
    />
  );
};

export default SearchBar;
