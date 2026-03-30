import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Plugin to resolve figma:asset/* imports to a placeholder
function figmaAssetPlugin() {
    return {
        name: 'figma-asset-resolver',
        resolveId(source: string) {
            if (source.startsWith('figma:asset/')) {
                return source; // Mark as resolved
            }
        },
        load(id: string) {
            if (id.startsWith('figma:asset/')) {
                // Return a transparent 1x1 pixel PNG as data URL
                return `export default "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="`;
            }
        }
    };
}

// Plugin to handle directory slashes for public index.html files in dev
function publicDirectoryPlugin() {
    return {
        name: 'public-directory-resolver',
        configureServer(server: any) {
            server.middlewares.use((req: any, res: any, next: any) => {
                const url = req.url?.split('?')[0] || '';
                if (url === '/' || url.includes('.')) {
                    return next();
                }

                // Check if there's a folder in public/ with this name + /index.html
                const cleanUrl = url.endsWith('/') ? url : url + '/';
                const publicFilePath = path.join(__dirname, 'public', cleanUrl, 'index.html');

                if (fs.existsSync(publicFilePath)) {
                    // If it doesn't have a trailing slash, redirect to the trailing slash version
                    // to ensure relative assets resolve correctly.
                    if (!url.endsWith('/')) {
                        res.statusCode = 301;
                        res.setHeader('Location', url + '/');
                        return res.end();
                    }
                    req.url = path.join(url, 'index.html');
                }
                next();
            });
        }
    };
}

export default defineConfig({
    plugins: [
        figmaAssetPlugin(),
        publicDirectoryPlugin(),
        tailwindcss(),
        react()
    ],
});
