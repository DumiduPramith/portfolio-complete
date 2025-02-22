export interface PortfolioFetchResponseInterface {
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
      technologies: TechnologiesInterface[];
      projectUrls: [
        {
          url: string;
          iconUrl: string;
          iconName: string;
          isActive: boolean;
        }
      ];
      isActive: boolean;
      index: number;
    }
  ];
}

interface TechnologiesInterface {
  name: string;
  isActive: boolean;
  index: number;
}
