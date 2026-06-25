import { Typography } from '@/components/ui/Typography';

type VerticalTitleProps = {
  title: string;
  showOnMobile?: boolean;
};

export const VerticalTitle = ({
  title,
  showOnMobile = false,
}: VerticalTitleProps) => {
  if (!showOnMobile) {
    return (
      <aside className="sticky bottom-0 left-0 top-0 hidden h-screen w-[40px] items-center justify-center bg-[#A86A45] lg:flex xl:w-[90px] 2xl:w-[120px]">
        <div className="-rotate-90 transform whitespace-nowrap font-bold uppercase tracking-wider text-white">
          <Typography variant="h4" className="text-center text-white">
            {title}
          </Typography>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky bottom-0 left-0 top-0 flex h-screen w-[40px] items-center justify-center bg-[#A86A45] lg:hidden xl:w-[90px] 2xl:w-[120px]">
      <div className="flex h-full flex-col items-center justify-center">
        <Typography
          variant="h4"
          className="-rotate-90 transform whitespace-nowrap text-center font-bold uppercase tracking-wider text-white"
        >
          {title}
        </Typography>
      </div>
    </aside>
  );
};
