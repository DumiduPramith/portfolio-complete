export interface AboutFetchResponseInterface {
  paragraph1: string;
  paragraph2: string;
  profilePictureUrl: string;
  techStack: [
    {
      name: string;
      description: string;
      iconUrl: string;
      isActive: boolean;
    }
  ];
  tools: [
    {
      name: string;
      description: string;
      iconUrl: string;
      isActive: boolean;
    }
  ];
}
