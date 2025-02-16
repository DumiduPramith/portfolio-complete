export interface HomeUpdateRequestInterface {
  brandName: string;
  firstName: string;
  lastName: string;
  github: {
    isActive: boolean;
    url: string;
  };
  professions: [
    {
      index: number;
      isActive: boolean;
      professionName: string;
    }
  ];
  profilePicture: {
    isChanged: boolean;
    profilePictureUrl: string;
  };
  resumeFile: {
    isActive: boolean;
    isChanged: boolean;
    resumeUrl: string;
  };
  socialMedias: [
    {
      name: string;
      url: string;
      isActive: boolean;
      iconUrl: string;
    }
  ];
}
