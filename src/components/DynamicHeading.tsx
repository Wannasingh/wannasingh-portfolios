"use client";

interface DynamicHeadingProps {
  customTitle?: string;
  pageType?: 'home' |'about' | 'hire-me' | 'portfolio';
}

export const DynamicHeading: React.FC<DynamicHeadingProps> = ({ customTitle, pageType }) => {
  const defaultTitle = "Wannasingh Khansophon";
  
  const getPageTitle = () => {
    if (customTitle) return customTitle;
    
    switch (pageType) {
      case 'about':
        return "About Me";
      case 'hire-me':
        return "Work With Me";
      case 'portfolio':
        return "My Portfolio";
      default:
        return defaultTitle;
    }
  };

  return (
    <h1 className="text-4xl md:text-5xl font-bold">
      {getPageTitle()}
    </h1>
  );
};
