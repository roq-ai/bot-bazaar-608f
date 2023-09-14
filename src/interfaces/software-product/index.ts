import { FavoritesInterface } from 'interfaces/favorites';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SoftwareProductInterface {
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

export interface SoftwareProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  version?: string;
  developer_id?: string;
}
