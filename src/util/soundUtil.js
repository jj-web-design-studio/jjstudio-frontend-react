// Convert base64 string to Blob
export const base64ToSoundFile = (base64) => {
  if (!base64) return;
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob(byteArray, {type: 'audio/mp3'});
}

// Convert array of base64 string to array of Blob
export const base64ListToSoundFileList = (base64List) => {
  let blobs = [];
  for (let base64 in base64List) {
    blobs.push(base64ToSoundFile(base64));
  }
  return blobs;
}