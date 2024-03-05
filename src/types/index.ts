export type Nullable<T> = T | null;

export interface UserDataProps {
  firstName: string;
  _assistant: boolean;
  _admin: boolean;
  middleName: string;
  avatar: string;
  slug: string;
  username: string;
  lastName: string;
  _staffing: boolean;
  uid: string;
  modifiedAt: string;
  createdAt: string;
  email: string;
}

export interface FAQDataProps {
  answer: string;
  category: {
    label: string;
    value: string;
  };
  createdAt: Date;
  modifiedAt: Date;
  question: string;
  shortQuestion: string;
  slug: string;
  visibility: string;
}

export interface HeroTopProps {
  rootBgColor: string;
  rootColor: string;
  breadcrumbs: any;
  bg: string;
  maxW: string | number;
  icon: string;
  title: string;
  tagline: any;
  badges: any;
  agencyLink: string;
  positionDetails: any;
  actionButton: any;
}

export interface AcronymsProps {
  createdAt: Date;
  description: string;
  slug: string;
  term: string;
}
export interface AgencyProps {
  agencyAcronym: string;
  agencyName: string;
  city: string;
  createdAt: Date;
  description: string;
  emailAddress: string;
  intro: string;
  phoneNumber: string;
  region: {
    label: string;
    value: string;
  };
  slug: string;
  state: {
    label: string;
    value: string;
  };
  streetAddress: string;
  streetAddress2: string | null;
  visibility: string;
  website: string;
  zipcode: string;
  postedBy: string;
}

export interface ApplicantsProps {
  authorizeBackgroundCheck: string;
  city: string;
  country: {
    label: string;
    value: string;
  };
  coverLetter: string;
  createdAt: Date;
  degreeType: {
    label: string;
    value: string;
  };
  desiredAnnualSalary: string;
  desiredEmploymentTypes: string;
  emailAddress: string;
  firstName: string;
  github: string;
  idealStartDate: Date;
  isUSEligible: string;
  isVeteran: string;
  jobId: string;
  jobStreetAddress: string;
  lastName: string;
  linkedIn: string;
  phoneNumber: string;
  resume: string | null;
  resumeLink: string;
  resumeText: string;
  state: {
    label: string;
    value: string;
  };
  visaSponsorship: string;
  zipCode: string;
}
export interface BlogsProps {
  category: {
    label: string;
    value: string;
  };
  createdAt: Date;
  description: string;
  intro: string;
  modifiedAt: Date;
  shortTitle: string;
  slug: string;
  title: string;
  visibility: string;
}
export interface CareersProps {
  createdAt: Date;
  jobAdditionalInformation: string;
  jobAgency: {
    label: string;
    value: string;
  };
  jobCity: string;
  jobContractName: {
    label: string;
    value: string;
  };
  jobContractNumber: string;
  jobDescription: string;
  jobDesiredQualifications: string;
  jobDuration: {
    label: string;
    value: string;
  };
  jobEducation: {
    label: string;
    value: string;
  };
  jobEndDate: Date;
  jobHours: {
    label: string;
    value: string;
  };
  jobIsRemote: string;
  jobIsVisa: string;
  jobMMandatoryQualifications: string;
  jobMonthsOfExperience: {
    label: string;
    value: string;
  };
  jobPostDate: Date;
  jobRegion: {
    label: string;
    value: string;
  };
  jobSalary: number;
  jobSalaryFrequency: {
    label: string;
    value: string;
  };
  jobShortTitle: string;
  jobSlug: string;
  jobStartDate: Date;
  jobState: {
    label: string;
    value: string;
  };
  jobStreetAddress: string;
  jobTitle: string;
  jobZipCode: string;
  modifiedAt: Date;
  visibility: string;
  postedBy: string;
}
