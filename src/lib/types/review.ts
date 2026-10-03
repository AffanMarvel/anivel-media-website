export interface ReviewItem {
  id: string;
  name: string;
  brandOrRole?: string;
  rating: number; // 1 to 5
  review: string;
  image?: string; // photo data url or avatar link
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  approvedAt?: string;
}

export interface ReviewSubmissionPayload {
  name: string;
  brandOrRole?: string;
  rating: number;
  review: string;
  image?: string;
}
