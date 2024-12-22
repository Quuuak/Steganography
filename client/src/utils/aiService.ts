import dotenv from 'dotenv';

dotenv.config();

export async function generateImage(): Promise<string> {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing. Please check your .env file.');
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/randomimage?category=wildlife`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'image/jpg'
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image. Please check the category or API key.");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Image fetching failed:', error);
    throw new Error('Failed to fetch image. Please try again.');
  }
}
