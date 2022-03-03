import Feedback from '../../components/about/Feedback';
import { IconType } from '../../utils';

type Props = {
  buttons: { title: string; icon: IconType; onPress: () => void }[];
};

const FeedbackContainer = ({ buttons }: Props) => {
  return <Feedback buttons={buttons} />;
};

export default FeedbackContainer;
