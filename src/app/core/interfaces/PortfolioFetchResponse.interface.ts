export interface PortfolioResponseInterface {
  projects: [
    {
      title: string;
      description: string;
      image: {
        name: string;
        url: string;
        smallUrl: string;
        width: string;
        height: string;
      };
      technologies: string[];
      projectUrls: [
        {
          url: string;
          iconUrl: string;
          iconName: string;
          isActive: boolean;
        }
      ];
      isActive: boolean;
    }
  ];
}
