import { hygraphFetch } from '@/lib/hygraph';
import { GET_VIDEO_GALLERIES } from '@/lib/queries';
import VideoGalleryClient, { VideoGalleryItem } from './VideoGalleryClient';

export const metadata = {
  title: 'Video Gallery | Sir Stephen Hawking Public School',
  description: 'Watch the latest videos, events, and activities from our school.',
};

const mockVideos: VideoGalleryItem[] = [
  {
    id: 'mock-1',
    title: 'Annual Sports Day Highlights',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    date: '2025-11-15T00:00:00.000Z'
  },
  {
    id: 'mock-2',
    title: 'Science Fair Exhibition 2025',
    videoUrl: 'https://www.youtube.com/watch?v=y6120QOlsfU', // Placeholder
    date: '2025-08-22T00:00:00.000Z'
  },
  {
    id: 'mock-3',
    title: 'School Choir Performance',
    videoUrl: 'https://www.youtube.com/watch?v=linlz7-Pnvw', // Placeholder
    date: '2025-12-20T00:00:00.000Z'
  }
];

export default async function VideoGalleryPage() {
  let videos: VideoGalleryItem[] = [];

  try {
    const data = await hygraphFetch<{ videoGalleries: any[] }>({
      query: GET_VIDEO_GALLERIES,
      revalidate: 60, // check frequently while setting up
    });
    
    if (data && data.videoGalleries && data.videoGalleries.length > 0) {
      videos = data.videoGalleries.map((v) => ({
        id: v.id,
        title: v.title,
        videoUrl: v.videoUrl,
        date: v.date
      }));
    } else {
      // If no videos exist but query succeeded
      videos = mockVideos;
    }
  } catch (error) {
    console.warn("Hygraph Fetch Video Galleries failed, falling back to mock data:", error);
    // Fallback to mock data if the model isn't created in Hygraph yet or query fails
    videos = mockVideos;
  }

  return (
    <main style={{ minHeight: '80vh' }}>
      <VideoGalleryClient videos={videos} />
    </main>
  );
}
