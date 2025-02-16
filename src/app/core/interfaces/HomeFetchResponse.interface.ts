export interface HomeFetchResponseInterface {
  profilePictureUrl: string;
  brandName: string;
  firstName: string;
  lastName: string;
  professions: [
    {
      professionName: string;
      isActive: boolean;
      index: number;
    }
  ];
  socialMedias: [
    {
      name: string;
      url: string;
      iconUrl: string;
      isActive: boolean;
    }
  ];
  resume: {
    resumeUrl: string;
    isActive: boolean;
  };
  github: {
    githubUrl: string;
    isActive: boolean;
  };
}
