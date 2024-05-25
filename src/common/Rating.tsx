import { useAtomValue } from "jotai";
import { RatingPropsType } from "../@types/Rating";
import { drawerAtom } from "../store/drawer";

const Rating = (props: RatingPropsType) => {
  const drawerState = useAtomValue(drawerAtom);
  const { type, reviewId, changeFn, score, userList } = props;

  const ratingArray = [1, 2, 3, 4, 5];

  return (
    <>
      <div
        className={`rating rating-sm sm:rating-md ml-2 ${type === "view" && "pointer-events-none"} ${(drawerState || userList) && "-z-10"}`}
      >
        <input
          type="radio"
          name={`rating-${reviewId}`}
          value={0}
          className="rating-hidden"
          onChange={(e) => {
            changeFn && changeFn(e);
          }}
          checked={score === 0}
        />
        {ratingArray.map((num) => (
          <input
            key={num}
            type="radio"
            name={`rating-${reviewId}`}
            value={num}
            className="mask mask-star-2 bg-yellow-400"
            onChange={(e) => {
              changeFn && changeFn(e);
            }}
            checked={score === num}
          />
        ))}
      </div>
    </>
  );
};

export default Rating;
