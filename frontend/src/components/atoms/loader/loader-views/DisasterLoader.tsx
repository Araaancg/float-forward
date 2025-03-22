import "../loader.scss";

export default function DisasterLoader() {
  return (
    <>
      <div className="flex sm:hidden w-full p-4 justify-center max-w-2xl">
        <div className="p-4 w-full max-w-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton-wrapper skeleton-wrapper-center">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>

          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>

          <div className="skeleton skeleton-hr"></div>
          <div className="skeleton skeleton-carrousel"></div>
        </div>
      </div>

      <div className="hidden sm:flex w-full p-4 justify-center ">
        <div className="p-4 w-full max-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="w-full flex gap-3">
            <div className="skeleton-wrapper skeleton-wrapper-start">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="skeleton skeleton-image"></div>
          </div>
          <div className="flex gap-3 w-full">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
          <div className="skeleton skeleton-hr"></div>
          <div className="skeleton skeleton-carrousel"></div>
        </div>
      </div>
    </>
  );
}
