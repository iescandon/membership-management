interface JobInfo {
  id?: number;
  i_am?: string;
  company_name?: string;
  title?: string;
  years_of_experience?: number;
  linkedin_url?: string;
};
  
interface ProfilePhoto {
  id?: number;
  file_url?: string;
};
  
export interface UserData {
  id: number;
  birth_year?: string;
  first_name: string;
  last_name: string;
  name?: string;
  email: string;
  created_at: string;
  profile_photo?: ProfilePhoto[];
  job_info?: JobInfo;
};

export interface ChapterUserData {
  id: number;
  first_name: string;
  last_name: string;
  linkedin_url?: string;
  company_name?: string;
  title?: string;
  profile_photo?: string[];
};

// API TYPES
interface Data {
  last_page: number;
  data: UserData[];
};
  
export interface SuccessResponse {
  success: boolean;
  message: string;
  data: Data;
};
  
interface Chapter {
  chapterName: string;
  chapterNum: number;
};
  
export interface ChapterDict {
  [key: string]: Chapter;
};

