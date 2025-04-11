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
      return Response.json({ value: data.data[0] })
    } catch (err) {
      return Response.json({ error: 'Quantum fetch failed' }, { status: 500 })
    }
  }
  