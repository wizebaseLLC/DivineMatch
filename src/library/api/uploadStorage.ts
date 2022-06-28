import { Storage } from 'aws-amplify';

export interface UploadImageProps {
  ref: string;
  uri: string;
  mediaType?: string;
}

async function urlToBlob(uri: string) {
  const uploadedProfilePic = await fetch(uri);
  return uploadedProfilePic.blob();
}

export async function uploadStorage({ ref, uri }: UploadImageProps) {
  if (uri) {
    const blob = await urlToBlob(uri);
    // console.log(uri);
    const contentType = uri.slice(uri.length - 3, uri.length);
    const createContentType = () => {
      switch (contentType) {
        case 'mov':
          return 'video/mp4';
        case 'gif':
          return 'image/gif';
        default:
          return 'image/jpeg';
      }
    };
    Storage.put(ref, blob, {
      contentType: createContentType(),
    });
  }
}
