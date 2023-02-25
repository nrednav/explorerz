import { FC, ReactNode } from "react";

type DrawerSectionProps = {
  title: string;
  children?: ReactNode;
};

const DrawerSection: FC<DrawerSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-sm capitalize sm:text-lg">{title}</h3>
      {children}
    </div>
  );
};

export default DrawerSection;
