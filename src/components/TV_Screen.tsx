import Image from 'next/image';

export function TV_Screen({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`absolute -z-10 pointer-events-none ${className}`}>
      <Image
        src="/TV-asset.png"
        alt="Retro TV"
        width={232}
        height={202}
        className="block w-full h-auto select-none opacity-80"
        priority={false}
      />
      {/* Screen area */}
      <div className="absolute inset-[12%] flex items-center justify-center text-[10px] md:text-xs text-white/80 font-mono">
        {children}
      </div>
    </div>
  );
}
