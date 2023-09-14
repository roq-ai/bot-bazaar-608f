import { FavoritesInterface } from 'interfaces/favorites';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AiToolInterface {
  id?: string;
  name: string;
  description?: string;
  version: string;
  developer_id: string;
  created_at?: any;
  updated_at?: any;
  favorites?: FavoritesInterface[];
  user?: UserInterface;
  _count?: {
    favorites?: number;
  };
}

export interface AiToolGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  version?: string;
  developer_id?: string;
}
