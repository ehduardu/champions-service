
import { LOL_API } from '@utils/config';
import { AxiosInstance, AxiosStatic } from 'axios';

import { IModelLeagueOfLegendsProvider, IResponse } from './types';

export default class LeagueOfLegendsProvider implements IModelLeagueOfLegendsProvider {

  private request: AxiosInstance;

  constructor(requestHandler: AxiosStatic) {
    this.request = requestHandler.create({
      baseURL: LOL_API.baseURL,
    });
  }

  public async getChampions(): Promise<IResponse> {
    const response = await this.request.get<IResponse>(LOL_API.championsURL);

    return response.data;
  }
}