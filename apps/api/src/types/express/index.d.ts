declare namespace Express {
  export interface Request {
    user: {
      email: string;
      id: number;
      organisationID: number;
      // this key will only work on mobile apps since we are not setting this when web user logs in
      workoutTemplateID: number;
    };
  }
}
