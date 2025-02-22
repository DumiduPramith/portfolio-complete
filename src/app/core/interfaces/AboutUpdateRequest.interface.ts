export interface AboutUpdateRequestInterface {
  paragraph1: string;
  paragraph2: string;
  techStack: SkillCardInterface[];
  tools: SkillCardInterface[];
}

interface SkillCardInterface {
  name: string;
  description: string;
  iconUrl: string;
  isActive: boolean;
  index: number;
}
