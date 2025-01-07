import React from 'react';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import { AxiosProvider } from '@/providers/axios.provider';
import { Home, HomeLayout } from './home';
import { Comic } from '@/app/comic';
import { Chapter } from './chapter';
import GraphqlProvider from '@/providers/graphql.provider';


const Router = createBrowserRouter([
  {
    path: '/',
    Component: HomeLayout,
    handle: {
      crumb: () => 'Home'
    },
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: ':comicId',
        handle: {
          crumb: () => 'Comic'
        },
        children: [
          {
            index: true,
            Component: Comic
          },
          {
            path: ':chapterId',
            Component: Chapter,
            handle: {
              crumb: () => 'Chapter'
            }
          }
        ]
      },

    ]
  }
]);

export function App() {
  return (
    <GraphqlProvider>
      <AxiosProvider>
        <RouterProvider router={Router}/>
      </AxiosProvider>
    </GraphqlProvider>
  );
}

export default App;
