export default {
  apiVersion: 'v2022-07-01',
  dataset: import.meta.env.VITE_SANITY_STUDIO_API_DATASET || 'production',
  projectId: 'f3wu28ux',
  token: import.meta.env.VITE_SANITY_NETLIFY_TOKEN || process.env.SANITY_TOKEN,
  useCdn: true,
};
