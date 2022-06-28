/* eslint-disable camelcase */
export interface LikesProps {
  id: string;
  user_id: string;
  recipient_id: string;
  is_divine: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LikesPropsWithMatch {
  id: string;
  user_id: string;
  recipient_id: string;
  is_divine: boolean;
  is_match: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NewLikesProps {
  user_id: string;
  recipient_id: string;
  is_divine: boolean;
}

export interface LikesViewProps {
  user_id: string;
  recipient_id: string;
  like_id: string;
  is_divine: boolean;
  firstname: string;
  lastname: string;
  location: string;
  profilepic: string;
  updated_at: Date;
}
