import { Outlet } from 'react-router';
import Header from './components/layout/header';
import Breadcrumbs from '@/app/home/components/layout/breadcrumbs';

export default function Layout() {
  return (
    <>
      <div
        style={{
          transformOrigin: 'center top',
          transitionProperty: 'transform',
          borderRadius: ' transition-duration: 0.5s',
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div className={'relative flex min-h-svh flex-col bg-background'}>
          <div className={'border-grid flex flex-1 flex-col'}>
            <Header />
            <main className={'flex flex-1 flex-col'}>
              <div className={'container-wrapper'}>
                <div className={'container flex-1 items-start mx-auto'}>
                  <div className={'pt-3'}>
                    <Breadcrumbs></Breadcrumbs>
                  </div>
                  <Outlet></Outlet>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}