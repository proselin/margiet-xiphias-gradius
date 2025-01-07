import React, { useEffect, useState } from 'react';
import { Link, useMatches, useParams } from 'react-router';
import { useGraphql } from '@/hooks/use-graphql';
import { gql } from '@apollo/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ComicDetails {
  id: number;
  status: any;
  tags: string[];
  title: string;
  thumbImage: ThumbImage;
  chapters: Chapter[];
  chapterCount: number;
  author: string;
  description: any;
  updatedAt: string;
  createdAt: string;
}

export interface ThumbImage {
  url: string;
}

export interface Chapter {
  title: string;
  position: number;
  chapterNumber: string;
  updatedAt: string;
  id: number;
}

export interface IComicDetailsResponse {
  comicDetails: ComicDetails;
}


function Page() {
  const { comicId } = useParams<{ comicId: string }>();
  const [comic, setComic] = useState<ComicDetails | null>(null);
  const graphql = useGraphql();

  const matches = useMatches();
  console.log(matches);

  const loadComic = (comicId: number) => {
    return graphql.query<IComicDetailsResponse>({
      query: gql`
       query PageableComics($comicId: Float!) {
        comicDetails(comicId: $comicId) {
          id
          status
          tags
          title
          thumbImage {
            url
          }
          chapters {
            title
            id
            position
            chapterNumber
            updatedAt
          }
          chapterCount
          author
          description
          updatedAt
          createdAt
        }
      }
      `,
      variables: {
        comicId
      }
    });
  };

  useEffect(() => {
    loadComic(Number(comicId)).then(r => {
      setComic(r.data.comicDetails);
    });
  }, [comicId]);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 mt-3 ">{comic?.title ?? '---'}</h1>
      <small>Last updated at {comic?.updatedAt}</small>
      <div className="pt-3 px-3 pb-2 grid grid-cols-2">
        <img src={comic?.thumbImage?.url} alt="Thumb Image" className="w-[20rem] h-[20rem] rounded-md object-cover" />
        <div className="grid grid-cols-2">
          <strong>Author</strong>
          <div>{comic?.author}</div>
          <strong>Tags</strong>
          <div>{comic?.tags.join(', ')}</div>
          <strong>Total chapters</strong>
          <div>{comic?.chapterCount}</div>
        </div>
      </div>

      <section>
        <h2 className="text-xl mb-4">Chapters</h2>
        <ScrollArea className="h-96 whitespace-nowrap rounded-md border">
          {comic?.chapters?.map((chapter) => (
            <div key={chapter.id} className={'mx-[3vw] flex justify-between'}>
              <Link
                className="cursor-pointer block underline  text-left"
                to={`/${comicId}/${chapter.id}`}
              >
                {chapter.title}
              </Link>
              <small className={'text-right'}>{chapter.updatedAt}</small>
            </div>
          ))}
        </ScrollArea>
      </section>
    </div>

  );
}

export default Page;
