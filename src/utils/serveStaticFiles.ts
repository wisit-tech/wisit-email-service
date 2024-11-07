import express, { Express } from 'express';
import path from 'path';

/**
 * Utility function to serve static files from a specified directory
 * @param app - The Express application instance
 * @param urlPath - The URL path to serve static files
 * @param directoryPath - The directory path from where to serve the static files
 */
export const serveStaticFiles = (app: Express, urlPath: string, directoryPath: string): void => {
  app.use(urlPath, express.static(path.resolve(directoryPath)));
};
