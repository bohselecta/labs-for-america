import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// simple tile clustering in code (demo): bucket to 0.01 deg grid
export async function GET() {
  const msgs = await prisma.chatMessage.findMany({
    where: { 
      approved: true, 
      NOT: [{ lat: null }, { lon: null }] 
    },
    select: { lat: true, lon: true }
  });

  const buckets = new Map<string, number>();
  for (const m of msgs) {
    if (m.lat == null || m.lon == null) continue;
    const latB = Math.round(m.lat * 100) / 100;
    const lonB = Math.round(m.lon * 100) / 100;
    const key = `${latB},${lonB}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  const points = [...buckets.entries()].map(([k, count]) => {
    const [lat, lon] = k.split(",").map(Number);
    // jitter ±0.002 for privacy
    const jitter = () => (Math.random() - 0.5) * 0.004;
    return { 
      lat: lat + jitter(), 
      lon: lon + jitter(), 
      count 
    };
  });

  return NextResponse.json({ 
    points, 
    generatedAt: new Date().toISOString() 
  });
}
