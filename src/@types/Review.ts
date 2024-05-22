export interface ReviewType {
  id: string;
  title: string;
  contents: string;
  date: Date;
  stars: number;
  writer: string;
  image?: string;
}
