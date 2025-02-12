// import { lazy } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Group } from '@mantine/core';
import { AppLayout } from '@/app-layout';
// import { ClusterUiSelect } from '@/features/cluster/ui/cluster-ui-select';
import { WalletButton } from '@/features/solana/solana-provider';
// import { UiThemeToggler } from '@/ui/ui-theme-toggler';
import { HomeFeature } from './features/home/home.feature';
import { NotFound } from './ui/ui-not-found';

// const AccountList = lazy(() => import('@/features/account/account-feature-list'));
// const AccountDetail = lazy(() => import('@/features/account/account-feature-detail'));
// const ClusterFeature = lazy(() => import('@/features/cluster/cluster-feature'));
// const CollectionDetailFeature = lazy(
//   () => import('@/features/collection/collection-detail-feature')
// );
// const CollectionGridFeature = lazy(() => import('@/features/collection/collection-grid-feature'));

const router = createBrowserRouter([
  {
    element: (
      <AppLayout
        links={[
          { label: 'Home', to: '/' },
          // { label: 'Account', to: '/account' },
          // { label: 'Clusters', to: '/clusters' },
          // { label: 'Collections', to: '/collections' },
        ]}
        profile={
          <Group>
            {/* <UiThemeToggler /> */}
            <WalletButton />
            {/* <ClusterUiSelect /> */}
          </Group>
        }
      >
        <Outlet />
      </AppLayout>
    ),
    children: [
      { path: '/', element: <HomeFeature /> },
      { path: '*', element: <NotFound /> },
      // { path: '/account', element: <AccountList /> },
      // { path: '/account/:address', element: <AccountDetail /> },
      // { path: '/clusters', element: <ClusterFeature /> },
      // { path: '/collections', element: <CollectionGridFeature /> },
      // { path: '/collections/:collection', element: <CollectionDetailFeature /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
