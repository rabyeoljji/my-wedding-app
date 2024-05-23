import { useParams } from "react-router";

const ReviewEditor = (): JSX.Element => {
  const { id } = useParams();

  return <div>review id : {id}</div>;
};

export default ReviewEditor;
