import { UserInterface } from 'interfaces/user';
import { SoftwareProductInterface } from 'interfaces/software-product';
import { AiToolInterface } from 'interfaces/ai-tool';
import { PluginInterface } from 'interfaces/plugin';
import { GetQueryInterface } from 'interfaces';

export interface FavoritesInterface {
  id?: string;
  user_id: string;
  software_product_id: string;
  ai_tool_id: string;
  plugin_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  software_product?: SoftwareProductInterface;
  ai_tool?: AiToolInterface;
  plugin?: PluginInterface;
  _count?: {};
}

export interface FavoritesGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  software_product_id?: string;
  ai_tool_id?: string;
  plugin_id?: string;
}
