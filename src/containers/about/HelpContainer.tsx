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
  p('All information you share and the queries you set up are stored locally.'),
  h3('How do I start?'),
  h6('Connect to Supabase'),
  p(
    'First, connect to Supabase. Paste your client URL and anon key into the connection settings. Optionally, authenticate to interact with the database as a user.'
  ),
  h6('Create a Query'),
  p(
    'Queries are single database calls. Currently, you can either perform a SELECT statement on a table/view or you can call an RPC. Once the data is retrieved, specify how it is displayed',
    "If you choose a COUNT query, you'll see a number displayed in the dashboard. Otherwise, set up the x and y axis for the chart based on the retrieved data.",
    'For example, suppose you have a view:',
    'SELECT COUNT(1) AS count, created_day FROM profile GROUP BY created_day',
    "To display a time chart for the above query, set the x column to 'created_day' and the y column as 'count'. Then, select time as the scale"
  ),
  h6('Customize Dashboard'),
  p(
    'Finally, add queries to your home page in the order that makes sense to you'
  ),
];

const HelpContainer = () => {
  return <TextWall elements={elements} />;
};

export default HelpContainer;
