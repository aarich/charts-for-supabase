import { Fragment } from 'react';
import TextWall from '../../components/about/TextWall';
import { a } from '../../components/base/Anchor';
import { h4, p } from '../../components/base/io/Text';
import { MyConstants } from '../../utils';

const PRIVACY_URL = 'mrarich.com/privacy';

const elements = [
  h4('Privacy Policy'),
  p(
    'You can find the full privacy policy for this app ',
    a(PRIVACY_URL, 'here'),
    '.'
  ),
  p(
    '\nAll information is stored locally. The only network requests are made between your device and the Supabase connection provided.'
  ),
  h4('Acknowledgements'),
  p(
    'This app is not affiliated with Supabase in any way (other than the developer being a happy customer).\nCopyrights and trademarks may be owned by Supabase.\n'
  ),
  p(
    'Thanks to the following open source software and free services for making this project possible.'
  ),
  [
    { name: 'Expo', url: 'expo.dev' },
    { name: 'React Native', url: 'reactnative.dev' },
    { name: 'React Query', url: 'react-query.tanstack.com' },
    { name: 'Supabase', url: 'supabase.com' },
    { name: 'UI Kitten', url: 'akveo.github.io/react-native-ui-kitten' },
    { name: 'Victory Charts', url: 'formidable.com/open-source/victory/' },
  ].map((link) => (
    <Fragment key={link.name}>{p(a(link.url, link.name))}</Fragment>
  )),
  h4("Who's building this?"),
  p(
    'You can find out more about the developer ',
    a('mrarich.com/about', 'here'),
    '.'
  ),
  p(),
  p(
    `Want to see your name here? ${MyConstants.manifest?.name} is open source! `,
    a('github.com/aarich/charts-for-supabase', 'Check it out on GitHub'),
    ' and, if you like, make an improvement. We are also built on top of great open source software like the ones listed above.'
  ),
  p(),
  p(
    `Version ${MyConstants.version} © ${new Date(
      Date.now()
    ).getFullYear()} Alex Rich`
  ),
];

const AboutContainer = () => {
  return <TextWall elements={elements} />;
};

export default AboutContainer;
