import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with API token from environment variables
export const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

// Helper function to run Google Maps Scraper (compass/crawler-google-places)
// This is one of the best actors for finding business leads
export async function searchBusinessLeads(query: string, location: string, maxLeads: number = 20) {
    if (!process.env.APIFY_API_TOKEN) {
        throw new Error("APIFY_API_TOKEN not found in environment variables");
    }

    const searchString = `${query} in ${location}`;

    // Using compass/crawler-google-places which is very efficient
    const input = {
        searchStringsArray: [searchString],
        locationQuery: location,
        maxCrawledPlacesPerSearch: maxLeads,
        language: "pt",
        maxImages: 0,
        maxReviews: 0,
        scrapeReviewerName: false,
        scrapeReviewerId: false,
        scrapeReviewerUrl: false,
        scrapeReviewText: false,
        scrapeReviewImage: false,
        scrapeReviewRating: false,
        scrapeReviewResponse: false,
        scrapeReviewResponseDate: false,
        scrapeReviewDate: false,
        // We mainly want contact info
        allPlacesNoSearchAction: false,
    };

    try {
        // Run the actor and wait for it to finish
        const run = await apifyClient.actor("compass/crawler-google-places").call(input);

        // Fetch results from the dataset
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

        return items;
    } catch (error) {
        console.error("Apify execution failed:", error);
        throw error;
    }
}
