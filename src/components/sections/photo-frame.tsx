import Image from "next/image";

type Frame = {
  src: string;
  alt: string;
  caption: string;
};

export function PhotoFrame({ images }: { images: Frame[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src}>
          <div className="relative aspect-[4/5] bg-paper-deep">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
