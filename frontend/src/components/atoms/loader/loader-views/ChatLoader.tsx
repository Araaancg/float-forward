import "../loader.scss";

export default function ChatLoader() {
  return (
    <>
      <div className="flex sm:hidden w-full p-4 justify-center ">
        <div className="p-4 w-full max-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton-wrapper skeleton-wrapper-center">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="w-full flex gap-3 justify-center items-start mt-4">
            <div className="skeleton-chatItem-wrapper">
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex w-full p-4 justify-center ">
        <div className="p-4 w-full max-4xl flex flex-col justify-center items-center gap-4">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton-wrapper skeleton-wrapper-center">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="w-full flex gap-3 justify-center items-start mt-4">
            <div className="skeleton-chatItem-wrapper">
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
              <div className="skeleton skeleton-chatItem"></div>
            </div>
            <div className="skeleton skeleton-chatBox"></div>
          </div>
        </div>
      </div>
    </>
  );
}
