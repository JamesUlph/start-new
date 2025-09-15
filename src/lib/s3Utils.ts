export function extractS3Info(url: string): {
  bucket: string | null;
  filename: string | null;
} {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;

    // S3 bucket names are usually part of the hostname or the first path segment
    // We'll prioritize the subdomain if it looks like an S3 bucket
    let bucket: string | null = null;
    let filename: string | null = null;

    // Common S3 hostname patterns:
    // 1. <bucket-name>.s3.<region>.amazonaws.com
    // 2. s3.<region>.amazonaws.com/<bucket-name>/... (path-style access, less common now)
    // 3. <bucket-name>.s3.amazonaws.com (legacy)

    const s3DomainRegex = /\.s3(\.[a-z0-9-]+)?\.amazonaws\.com$/;

    if (hostname.match(s3DomainRegex)) {
      // Case 1 & 3: Bucket name is the first part of the hostname
      const parts = hostname.split('.');
      if (parts.length > 0) {
        bucket = parts[0];
      }
      // The filename is the entire path, but without the leading slash
      filename = pathname.substring(1); // Remove the leading '/'
    } else {
      // This might be a path-style access or a different S3-compatible service
      // For the given URL, the bucket is directly after 'https://' if it's not a subdomain
      // However, the example URL is clearly subdomain-style.
      // If the URL was like https://s3.amazonaws.com/my-bucket/path/to/file.jpg
      // This part of the logic would be more relevant.

      // For the given example, the hostname already gives us the bucket.
      // If it were a path-style URL, we'd need to parse `pathname` differently.
      // For your provided URL, this 'else' block wouldn't be hit for the bucket.
      // Let's refine based on the example provided.

      // If the bucket is part of the path, it would be the first segment of the pathname.
      // This is less common for modern S3 URLs but good to consider.
      const pathSegments = pathname.split('/').filter(Boolean); // filter(Boolean) removes empty strings
      if (pathSegments.length > 0 && !bucket) {
        // This logic is more for path-style S3 URLs or if the bucket isn't a subdomain
        // For the provided URL, the hostname logic correctly identifies the bucket.
        // We can safely assume the first segment of the path *after* the hostname
        // (which is already `neoma-multimediafiles-dev.s3.eu-west-2.amazonaws.com`)
        // is part of the object key, not the bucket name again.

        // So for the provided URL, the filename is simply the path after the hostname,
        // without the leading slash.
        filename = pathname.substring(1);
      }
    }

    // Handle the case where the URL has query parameters
    // The filename should only be the path part before any '?'
    if (filename && filename.includes('?')) {
      filename = filename.split('?')[0];
    }

    // The bucket in the example URL is actually `neoma-multimediafiles-dev` which is the subdomain.
    // The hostname will be `neoma-multimediafiles-dev.s3.eu-west-2.amazonaws.com`.
    // We want to extract `neoma-multimediafiles-dev` from this hostname.
    const hostnameParts = hostname.split('.');
    if (hostnameParts.length > 0 && hostnameParts.includes('s3')) {
      bucket = hostnameParts[0];
    }

    return { bucket, filename };
  } catch (error) {
    console.error('Invalid URL:', error);
    return { bucket: null, filename: null };
  }
}
