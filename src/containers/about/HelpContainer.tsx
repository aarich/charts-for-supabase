import TextWall from '../../components/about/TextWall';
import { a } from '../../components/base/Anchor';
import { h3, h6, p } from '../../components/base/io/Text';
import { MyConstants } from '../../utils';

const appName = MyConstants.manifest?.name;
const elements = [
  h3(`What is this?`),
  p(
    `${appName} is an app to help developers monitor early-stage projects built with Supabase.`,
    " It's far from an enterprise analytics tool, but it's great for keeping an eye on your data. And,",
    a(MyConstants.githubUrl, " it's open source!")
  ),
  h3(`How does ${appName} work?`),
  p(
    'Connect to your supabase project using the public keys and (optionally) sign in as an end user. Then, create queries that query the project database.'
  ),
  h6('What about security?'),
  p(
    'This app connects to your project as an end user, so all RLS policies apply. ',
    a(
      'supabase.com/docs/guides/auth/row-level-security',
      'Learn more about implementing RLS here.'
    )
  ),
  h6('What information am I sharing?'),
  p('All information you enter and the queries you set up are stored locally.'),
  h3('How do I start?'),
  h6('1. Connect to Supabase'),
  p(
    'Paste your client URL and anon key into the connection settings. Optionally, authenticate to interact with the database as a user.'
  ),
  h6('2. Create a Query'),
  p(
    'Queries are single database calls. You can either execute a SELECT statement on a table/view or you can call an RPC. Once the data is retrieved, specify how it is displayed',
    '• COUNT: get a simple number.',
    '• CHART: set up the x and y axes for the chart',
    '• TABLE: get a raw data table',
    'For example, suppose you have a view:',
    'SELECT COUNT(1) AS count, created_day FROM profile GROUP BY created_day',
    "To display a time chart for the above query, set the x column to 'created_day' and the y column as 'count'. Then, select time as the scale"
  ),
  h6('3. Customize Dashboard'),
  p(
    'Finally, add queries to your home page in the order that makes sense to you'
  ),
  h6('4. ???'),
  h6('5. Profit'),
];

const HelpContainer = () => {
  return <TextWall elements={elements} />;
};

export default HelpContainer;
