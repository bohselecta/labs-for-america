import { differenceInDays, format } from "date-fns";

export function getDaysLeft(deadline: Date): number {
  return differenceInDays(deadline, new Date());
}

export function getTimelineProgress(deadline: Date, createdAt: Date): number {
  const totalDays = differenceInDays(deadline, createdAt);
  const daysLeft = getDaysLeft(deadline);
  const daysPassed = totalDays - daysLeft;
  
  if (totalDays <= 0) return 100;
  return Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));
}

export function getStatusBadge(status: string, daysLeft: number) {
  if (status === "closed") {
    return { text: "Closed", color: "bg-gray-100 text-gray-700" };
  }
  
  if (daysLeft < 0) {
    return { text: "Expired", color: "bg-red-100 text-red-700" };
  }
  
  if (daysLeft <= 7) {
    return { text: `${daysLeft} days left`, color: "bg-red-100 text-red-700" };
  }
  
  if (daysLeft <= 30) {
    return { text: `${daysLeft} days left`, color: "bg-amber-100 text-amber-700" };
  }
  
  return { text: `${daysLeft} days left`, color: "bg-green-100 text-green-700" };
}

export function getCategoryBadge(category: string) {
  const colors = {
    Federal: "bg-blue-100 text-blue-700",
    Civic: "bg-green-100 text-green-700", 
    Justice: "bg-purple-100 text-purple-700",
    Health: "bg-pink-100 text-pink-700",
    Mobility: "bg-orange-100 text-orange-700",
    Energy: "bg-yellow-100 text-yellow-700"
  };
  
  return {
    text: category,
    color: colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  };
}

export function getBeginnerBadge(isBeginner: boolean) {
  if (!isBeginner) return null;
  return { text: "Beginner Friendly", color: "bg-emerald-100 text-emerald-700" };
}
