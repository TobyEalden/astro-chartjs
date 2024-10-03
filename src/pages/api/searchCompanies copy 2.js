export async function GET({ request }) {
  return new Response(JSON.stringify({ message: 'Server is working' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
