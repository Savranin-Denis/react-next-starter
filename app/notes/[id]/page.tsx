import { getSingleNote } from '@/app/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  //   const note = await getSingleNote(id);
  //   console.log(note);

  //   const formattedDate = note.updatedAt
  //     ? `Updated at: ${note.updatedAt}`
  //     : `Created at: ${note.createdAt}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  //   return (
  //     <div>
  //       <h2>{note.title}</h2>
  //       <p>{note.content}</p>
  //       <button>Edit</button>
  //       <p>{formattedDate}</p>
  //     </div>
  //   );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
