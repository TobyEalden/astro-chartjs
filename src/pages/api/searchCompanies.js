// src/pages/api/searchCompanies.js

export async function GET({ request }) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(request.url);
    const query = url.searchParams.get('q'); // Extract the 'q' query parameter

    console.log(`Received search query: ${query}`); // Log the received query

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query parameter.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

   // Manually include API key and base URL for testing
   const API_KEY = '1f452114-b990-498b-9e63-df1800d6d51e'; // Test API Key
   const BASE_URL = `https://api.companieshouse.gov.uk/search/companies?q=${encodeURIComponent(query)}`; // Constructed URL


    // Log the API key and full URL for debugging
    console.log(`API Key being used: ${API_KEY}`);
    console.log(`Full API URL being requested: ${BASE_URL}`);

    // Make the API request to the Companies House API
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Basic ${btoa(`${API_KEY}:`)}`,
      },
    });

    // Log the request headers
    console.log("Request Headers:", {
      Authorization: `Basic ${btoa(`${API_KEY}:`)}`,
    });

    // Check if the API response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error received from Companies House API: ${errorText}`);
      return new Response(JSON.stringify({ error: 'Failed to fetch company data.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    // Log the data returned from the API
    console.log("Data received from Companies House API:", data);

    return new Response(JSON.stringify(data.items || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch company data.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
