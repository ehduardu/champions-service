import { IModelLeagueOfLegendsProvider, IResponse } from '@providers/LeagueOfLegendsProvider/types';
import { Logger } from '@utils/logger';

export default class GetAllChampionsService {

  constructor(
    private leagueOfLegendsProvider: IModelLeagueOfLegendsProvider
  ) { }

  async execute(logger: Logger): Promise<IResponse> {
    logger.log('Iniciando busca dos campeões na API...');

    const champions = await this.leagueOfLegendsProvider.getChampions();

    logger.log('Busca dos campeões na API finalizada', { version: champions.version });
    return champions;
  }

}