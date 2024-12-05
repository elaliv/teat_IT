export interface SignUpUserParams {
    fullName: string;
    phoneNumber: string;
    collegeGroup: string;
    email: string;
    password: string;
  }
  
  export interface SignInUserParams {
    email: string;
    password: string;
  }