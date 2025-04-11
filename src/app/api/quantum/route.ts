export async function GET() {
  try {
    const res = await fetch('https://api.quantumnumbers.anu.edu.au/?length=1&type=uint8', {
      headers: {
        'x-api-key': '42AUAKurZ01Va7pfD1pSjao5ffUZVDsy95IrOQjF',
      },
      cache: 'no-store',
    })

    if (!res.ok) throw new Error('Quantum API failed')

    const data = await res.json()

    // Check if data is structured as expected
    if (!data?.data || !data.data[0]) {
      throw new Error('Invalid data structure from API')
    }

    return Response.json({ value: data.data[0] })
  } catch {
    return Response.json({ error: 'Quantum fetch failed' }, { status: 500 })
  }
}
