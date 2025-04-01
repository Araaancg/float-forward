import "../loader.scss";

export default function PinLoader() {
  return (
    <>
      <div className="flex sm:hidden w-full p-4 justify-center max-w-2xl">
        <div className="p-4 w-full max-w-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton-wrapper skeleton-wrapper-center">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="flex flex-row justify-center items-center w-full gap-4">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>

          <div className="skeleton skeleton-map"></div>
          <div className="skeleton-card-wrapper">
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex w-full p-4 justify-center ">
        <div className="p-4 w-full max-w-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton-wrapper skeleton-wrapper-center">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="flex flex-row justify-center items-center w-full gap-4">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
          <div className="flex flex-row w-full">
            <div className="skeleton skeleton-map"></div>
            <div className="skeleton-card-wrapper">
              <div className="skeleton skeleton-card"></div>
              <div className="skeleton skeleton-card"></div>
              <div className="skeleton skeleton-card"></div>
              <div className="skeleton skeleton-card"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
