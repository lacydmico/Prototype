import React from 'react';
import { MetadataProps } from '../../types';

const MetadataDisplay: React.FC<MetadataProps> = ({
  genre,
  year,
  rating,
  duration,
  starring,
  description,
}) => {
  return (
    <div className="w-full">
      <div className="mb-3 flex gap-5 whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis uppercase whitespace-nowrap font-semibold text-base leading-[22px]">
          {genre}
        </span>
        <span className="overflow-hidden text-ellipsis uppercase whitespace-nowrap font-semibold text-base leading-[22px] flex-shrink-0">
          {year}
        </span>
        <span className="overflow-hidden text-ellipsis uppercase whitespace-nowrap font-semibold text-base leading-[22px] flex-shrink-0">
          <img
            src={`https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w100-q80/cbs_page_attribute/${rating.toLowerCase()}_4.png?format=webp`}
            alt={rating}
            className="h-[18px] w-[18px]"
          />
        </span>
        <span className="overflow-hidden text-ellipsis uppercase whitespace-nowrap font-semibold text-base leading-[22px] flex-shrink-0">
          {duration}
        </span>
      </div>

      <div className="overflow-hidden text-ellipsis line-clamp-3 text-lg leading-[22px] mb-2">
        {description}
      </div>

      <div className="overflow-hidden text-ellipsis line-clamp-1 mt-2 text-left text-base leading-[22px]">
        Starring:{' '}
        {starring.map((actor, index) => (
          <span key={actor} className="text-white/85">
            {actor}
            {index < starring.length - 1 && ', '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MetadataDisplay;