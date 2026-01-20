import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { path } = params;

  if (!path) {
    return new Response('Not Found', { status: 404 });
  }

  // Use an environment variable for the Eidos server base URL
  // Fallback to the one provided in the context if not set
  const eidosServerUrl = import.meta.env.EIDOS_SERVER_URL || 'http://localhost:3000';
  
  // Construct the target URL
  const targetUrl = new URL(`/files/${path}`, eidosServerUrl);

  return new Response(null, {
    status: 302,
    headers: {
      'Location': targetUrl.toString(),
      'Cache-Control': 'public, max-age=518400', // Keep the 6-day cache for the redirect
    },
  });
};
