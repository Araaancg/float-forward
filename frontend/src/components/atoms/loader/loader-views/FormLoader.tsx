import "../loader.scss";

export default function FormLoader() {
  return (
    <div className="w-full flex p-4 justify-center ">
      <div className="p-4 w-full max-4xl flex flex-col justify-center items-center gap-4">
        {/* HEADER - TITLE */}
        <div className="skeleton skeleton-title"></div>

        {/* BODY -INPUTS */}
        <div className="skeleton-wrapper skeleton-wrapper-start">
          <div className="skeleton skeleton-label"></div>
          <div className="skeleton skeleton-input"></div>
        </div>
        <div className="skeleton-wrapper skeleton-wrapper-start">
          <div className="skeleton skeleton-label"></div>
          <div className="skeleton skeleton-input"></div>
        </div>
        <div className="skeleton-wrapper skeleton-wrapper-start">
          <div className="skeleton skeleton-label"></div>
          <div className="skeleton skeleton-input"></div>
        </div>
        <div className="skeleton-wrapper skeleton-wrapper-start">
          <div className="skeleton skeleton-label"></div>
          <div className="skeleton skeleton-input"></div>
        </div>
      </div>
    </div>
  );
}
