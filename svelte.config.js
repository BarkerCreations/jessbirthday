import adapter from '@sveltejs/adapter-static';

export default {
    kit: {
        adapter: adapter(),
        paths: {
            base: '' // Cloudflare Pages needs this empty
        },
        prerender: {
            default: true // Ensures all pages generate as static files
        }
    }
};