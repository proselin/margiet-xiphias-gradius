import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGraphql } from '@/hooks/use-graphql';
import { gql } from '@apollo/client';
import { from } from 'rxjs';


export interface PageableComicsResponse {
  pageableComics: PageableComics;
}

export interface PageableComics {
  items: Item[];
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface Item {
  author: string;
  chapterCount: number;
  createdAt: string;
  id: number;
  status: any;
  tags: string[];
  thumbImage: ThumbImage;
  title: string;
  updatedAt: string;
}

export interface ThumbImage {
  url: string;
}


const Page: React.FC = () => {
  const navigate = useNavigate();
  const [comics, setComics] = useState<Item[]>([]);
  const graphql  = useGraphql();

  const loadComics = () => {
    return from(graphql.query<PageableComicsResponse>({
      query: gql`
        query PageableComics($pageable: ComicPageableInput!) {
          pageableComics(pageable: $pageable) {
            items {
             author
             chapterCount
             createdAt
             id
             status
             tags
             thumbImage {
              url
             }
             title
             updatedAt
            }
            currentPage
            limit
            totalCount
            totalPages
          }
        }
      `,
      variables: {
        'pageable': {
          'limit': 100,
          'page': 1,
          'sortBy': null,
          'sortOrder': null
        }
      }
    }));
  };

  useEffect(() => {
    loadComics().subscribe({
      next: (response) => {
        setComics(response.data.pageableComics.items)
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comics</h1>
      <ul>
        {comics.map((comic) => (
          <li
            key={comic.id}
            className="cursor-pointer underline text-blue-500"
            onClick={() => navigate(`/${comic.id}`)}
          >
            {comic.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
