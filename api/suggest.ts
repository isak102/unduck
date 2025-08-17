export function GET(_request: Request) {
  const q = new URL(_request.url).searchParams.get("q");
  if (!q) return new Response("No query provided", { status: 400 });

  const results = [
    "Hello world",
    "This is a test",
    "This is another test",
    "This is yet another test",
    "And another one",
    "And another one",
    "One more",
    "One more",
    "Another one",
    "Another one",
  ];

  return new Response(JSON.stringify([q, results]));
}
