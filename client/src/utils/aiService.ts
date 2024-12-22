export async function generateImage(): Promise<string> {
  const apiKey = "mur8RRpXaVFDebmbdp336A==9Jkey0npD2WgrdZR";

  try {
    const response = await fetch("https://api.api-ninjas.com/v1/randomimage?category=wildlife", {
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