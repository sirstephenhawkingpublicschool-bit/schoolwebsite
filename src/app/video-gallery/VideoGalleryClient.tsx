'use client';

import React from 'react';
import styles from './VideoGallery.module.css';

export interface VideoGalleryItem {
  id: string;
  title: string;
  videoUrl: string;
  date?: string;
}

interface VideoGalleryClientProps {
  videos: VideoGalleryItem[];
}

export default function VideoGalleryClient({ videos }: VideoGalleryClientProps) {
  // Utility to convert various YouTube URL formats to an embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    try {
      let videoId = '';
      
      // Handle youtu.be format
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } 
      // Handle youtube.com/watch?v= format
      else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v') || '';
      }
      // Handle youtube.com/embed/ format (already embedded)
      else if (url.includes('youtube.com/embed/')) {
        return url;
      }
      // Handle vimeo
      else if (url.includes('vimeo.com/')) {
        const vimeoId = url.split('vimeo.com/')[1]?.split('?')[0];
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // If it's a direct mp4 or unhandled format, just return the url
      // Note: for standard iframe, direct mp4 might not work as well as video tags,
      // but assuming the user uses youtube/vimeo as requested.
      return url;
    } catch (e) {
      return url;
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Video Gallery</h1>
        <p className={styles.subtitle}>
          Watch the latest events, activities, and highlights from Sir Stephen Hawking Public School.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No videos yet</h3>
          <p>Please add videos to the VideoGallery model in Hygraph.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.card}>
              <div className={styles.videoContainer}>
                <iframe
                  className={styles.iframe}
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.content}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                {video.date && (
                  <span className={styles.videoDate}>{formatDate(video.date)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
