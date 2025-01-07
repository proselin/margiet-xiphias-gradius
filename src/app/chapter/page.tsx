import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useGraphql } from '@/hooks/use-graphql';
import { gql } from '@apollo/client';

export interface ChapterByIdResponse {
  chapterById: ChapterById;
}

export interface ChapterById {
  id: number;
  images: Image[];
  position: number;
  title: string;
  chapterNumber: string;
  updatedAt: string;
}

export interface Image {
  url: string;
  id: number;
}


function Page() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<ChapterById | null>(null);
  const graphQL = useGraphql();


  const loadChapter = (chapterId: number) => {
    return graphQL.query<ChapterByIdResponse>({
      query: gql`
         query PageableComics($chapterId: Float!) {
          chapterById(chapterId: $chapterId) {
            id
            images {
              url
              id
            }
            updatedAt
            position
            title
            chapterNumber
          }
        }
      `,
      variables: {
        chapterId
      }
    });
  };

  useEffect(() => {
    // Simulate fetching chapter content
    const id = Number(chapterId);
    loadChapter(id).then(r => {
      setChapter(r.data.chapterById);
    });
  }, [chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
        <small>Last updated {chapter.updatedAt}</small>

        <div className="px-4 py-3 mx-3 ">
          {chapter.images.map((image) => {
            return <img src={image.url} key={image.id} alt={'Image chapter ' + chapter.title + ''} />;
          })}
        </div>
      </div>
    </>

  );
}

export default Page;

