/**
 * Meme Service
 * ------------
 * Handles all interactions with the external Meme API.
 * It also transforms the raw API data to add simulated fields
 * like price, rating, and category which the API lacks.
 */

const MEME_API_URL = 'https://api.imgflip.com/get_memes';

export const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];

/**
 * fetchMemes
 * Fetches the raw list of memes and enhances them with extra data.
 * @returns {Promise<Array>} List of enhanced meme objects.
 */
export const fetchMemes = async () => {
    try {
        const response = await fetch(MEME_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch memes');
        }
        const data = await response.json();

        if (!data.success) {
            throw new Error('API reported failure');
        }

        // Transform data:
        // The raw API only gives us ID, name, and URL.
        // We simulate a richer dataset by generating deterministically based on ID.
        const memes = data.data.memes.map(meme => {
            // Simple hash from ID string
            let hash = 0;
            for (let i = 0; i < meme.id.length; i++) {
                hash = ((hash << 5) - hash) + meme.id.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
            }
            // Ensure positive
            hash = Math.abs(hash);

            const rating = (hash % 5) + 1;
            const category = CATEGORIES[hash % CATEGORIES.length];
            const price = rating * 25; // Price logic based on rating

            return {
                ...meme,
                rating: rating,
                category: category,
                price: price
            };
        });

        return memes;

    } catch (error) {
        console.error("Meme service error:", error);
        throw error;
    }
};

/**
 * getMemeById
 * Finds a specific meme by its ID.
 * Since the API doesn't support fetching a single meme by ID,
 * we fetch all and search within the results.
 * 
 * @param {string} id - The meme ID to look for.
 * @param {Array} allMemes - Optional optimization: pass existing list if available.
 * @returns {Promise<Object>} The found meme object.
 */
export const getMemeById = async (id, allMemes = []) => {
    // If we have the list passed in, find it there directly
    if (allMemes.length > 0) {
        return allMemes.find(m => m.id === id);
    }

    // Fallback: Fetch all from API if simulate fetching single item
    const memes = await fetchMemes();
    return memes.find(m => m.id === id);
};
