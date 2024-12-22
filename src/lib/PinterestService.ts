import fetch from 'node-fetch';
import { load } from 'cheerio';

export class PinterestService {
    private static instance: PinterestService;
    private cachedImages: string[] = [];
    private lastBoardUrl: string | null = null;

    private constructor() {}

    public static getInstance(): PinterestService {
        if (!PinterestService.instance) {
            PinterestService.instance = new PinterestService();
        }
        return PinterestService.instance;
    }

    public async getRandomImage(boardUrl: string): Promise<string | null> {
        try {
            // If board URL changed or cache is empty, refresh cache
            if (this.lastBoardUrl !== boardUrl || this.cachedImages.length === 0) {
                await this.refreshImageCache(boardUrl);
            }

            // Return random image from cache
            if (this.cachedImages.length > 0) {
                const randomIndex = Math.floor(Math.random() * this.cachedImages.length);
                return this.cachedImages[randomIndex];
            }

            return null;
        } catch (error) {
            console.error('Error getting Pinterest image:', error);
            return null;
        }
    }

    private async refreshImageCache(boardUrl: string): Promise<void> {
        try {
            const response = await fetch(boardUrl);
            const html = await response.text();
            const $ = load(html);

            // Clear existing cache
            this.cachedImages = [];

            // Find all image elements and extract URLs
            $('img').each((_, element) => {
                const src = $(element).attr('src');
                if (src && src.includes('pinimg.com') && !src.includes('profile_')) {
                    this.cachedImages.push(src);
                }
            });

            this.lastBoardUrl = boardUrl;
        } catch (error) {
            console.error('Error refreshing Pinterest cache:', error);
            throw error;
        }
    }
} 