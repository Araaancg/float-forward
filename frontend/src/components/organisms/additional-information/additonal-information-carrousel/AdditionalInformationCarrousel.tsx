import { useRef, useState } from "react";
import AdditionalInformationItem from "../additional-information-item/AdditionalInformationItem";
import { IAdditionalInformation } from "@/types/interfaces";
import Button from "@/components/atoms/button/Button";
import CaretIcon from "@/components/atoms/icons/CaretIcon";
import theme from "@/theme";

export default function AdditionalInformationCarrousel({
  data,
}: {
  data: IAdditionalInformation[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth; // Scroll by container width
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => {
        const nextIndex =
          direction === "left"
            ? Math.max(prev - 1, 0)
            : Math.min(prev + 1, data.length - 1);
        return nextIndex;
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full relative">
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory scroll-smooth overflow-hidden scrollbar-hidden "
        >
          {data.map((el) => (
            <div key={el.id} className="snap-center flex-shrink-0 p-4">
              <AdditionalInformationItem {...el} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-10">
        <Button variant="no-color" onClick={() => scrollTo("left")}>
          <CaretIcon
            orientation="left"
            color={theme.extend.colors.pins.yellow.primary}
          />
        </Button>

        <div className="flex gap-3">
          {data.map((_, index) => (
            <span
              key={`ellipses-${index}`}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-pins-yellow-primary scale-125"
                  : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <Button variant="no-color" onClick={() => scrollTo("right")}>
          <CaretIcon
            orientation="right"
            color={theme.extend.colors.pins.yellow.primary}
          />
        </Button>
      </div>
    </div>
  );
}
