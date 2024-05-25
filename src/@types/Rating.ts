export interface RatingPropsType {
  type: "editor" | "view";
  reviewId: string;
  changeFn?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  score?: number;
  userList?: boolean;
}
