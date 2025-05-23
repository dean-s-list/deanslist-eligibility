import { lazy } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app-layout'
import { WalletButton } from '@/features/solana/solana-provider'
import { NotFound } from './ui/ui-not-found'

const HomeFeature = lazy(() => import('./features/home/home.feature'))

const router = createBrowserRouter([
  {
    element: (
      <AppLayout profile={<WalletButton color="accent" />}>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { path: '/', element: <HomeFeature /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
