import { useState, useEffect, useRef } from "react";
import DisasterEventsCard from "@/components/molecules/list-items/disaster-events-card/DisasterEventsCard";
import { IDisasters } from "@/types/interfaces";
import "./carrousel.scss";

export default function Carrousel({ info }: { info: IDisasters[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const intervalProgress = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 1;
      });
    }, 100); 

    return () => clearInterval(intervalProgress);
  }, [currentIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % info.length);
      setProgress(0);
    }
  }, [progress, info.length]); 

  const onBarClick = (num: number) => {
    setCurrentIndex(num);
    setProgress(0);

    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  return (
    <div className="carrousel">
      <DisasterEventsCard info={info[currentIndex]} />

      <div className="carrousel-progress">
        {info.length > 1 &&
          info.map((item, index) => (
            <div
              className={`carrousel-progress-container ${
                currentIndex === index ? "active" : ""
              }`}
              style={{ width: `${100 / info.length}%` }}
              key={index}
              onClick={() => onBarClick(index)}
            >
              <div
                className="carrousel-progress-container-bar"
                style={{
                  width: `${
                    currentIndex === index
                      ? progress
                      : index < currentIndex
                      ? "100"
                      : "0"
                  }%`,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}