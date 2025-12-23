import { Fragment } from 'react/jsx-runtime';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}
