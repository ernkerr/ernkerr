// You could import prisma here and return the trip needed etc.

export async function GET() {
  // Call prisma and fethc a trip from the backend
  return Response.json({
    id: "123",
    name: "delta trip",
  });
}

export async function POST() {
  return Response.json({
    hello: "from the backend!",
  });
}
