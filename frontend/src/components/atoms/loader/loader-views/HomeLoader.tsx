export default function HomeLoader() {
  return (
    <div className="w-full flex p-4 justify-center ">
      <div className="p-4 w-full max-4xl flex flex-col justify-center items-center gap-4">
        {/* HOME HEADER - TITLE AND DESC */}
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton-wrapper skeleton-wrapper-center">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>

        {/* HOME BODY - CARROUSEL */}
        <div className="skeleton skeleton-carrousel"></div>
      </div>
    </div>
  );
}
