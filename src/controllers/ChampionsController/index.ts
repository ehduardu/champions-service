/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import BaseController from '@controllers/BaseController';
import { GetAllChampionsService } from '@services';
import LeagueOfLegendsProvider from '@providers/LeagueOfLegendsProvider';
import axios from 'axios';
/**
 * ChampionsController
 * É responsável por manipular as requisições relacionadas aos campeões
 */
export default class ChampionsController extends BaseController {
  private getAllChampionsService: GetAllChampionsService;

  constructor() {
    super();

    const leagueOfLegendsProvider = new LeagueOfLegendsProvider(axios);

    this.getAllChampionsService = new GetAllChampionsService(leagueOfLegendsProvider);
  }

  /**
   * ChampionsController.list()
   * @description Retorna dados de todos os campeões
   */
  list = async (request: Request, response: Response): Promise<Response> => {
    const logger = this.getLogger(
      request,
      'test_id',
      'Requisição para retornar informações dos campeões.'
    );

    const champions = await this.getAllChampionsService.execute(logger);
    return response.status(200).send(champions.data);
  };
}
