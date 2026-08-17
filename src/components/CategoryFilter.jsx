import { useSearchParams } from "react-router-dom";

export default function CategoryFilter({ types }) {
  const [params, setParams] = useSearchParams();
  const active = params.get("type") || "all";

  const select = (type) => {
    if (type === "all") {
      setParams({});
    } else {
      setParams({ type });
    }
  };

  return (
    <div className="category-filter">
      <button
        className={active === "all" ? "is-active" : ""}
        onClick={() => select("all")}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          className={active === type ? "is-active" : ""}
          onClick={() => select(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
