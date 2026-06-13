import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reddit Outreach Tool | Find Customers on Reddit — SmartPost',
  description:
    'Find real Reddit conversations where people need your product. Search any keyword, filter by date and subreddit, reach out before competitors. Free to use.',
};

export default function IdeaValidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
