export interface ReviewType {
  id: string;
  title: string;
  contents: string;
  date: number[];
  stars: number;
  writer: string;
  business_id: string;
  image?: string;
}

export interface UpdateReviewType {
  itemId: string;
  reviewList: string[];
  reviewId: string;
}
