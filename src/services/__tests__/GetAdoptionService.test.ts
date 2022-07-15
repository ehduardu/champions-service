import sinon from 'sinon';
import axios from 'axios';

import { GetAllChampionsService } from '../index';
import { Logger } from '@utils/logger';
import LeagueOfLegendsProvider from '@providers/LeagueOfLegendsProvider';
import GetChampionsSuccessMock from '@providers/LeagueOfLegendsProvider/mocks/getChampionsSuccess.json';
import { IResponse } from '@providers/LeagueOfLegendsProvider/types';

let getAllChampionsService: GetAllChampionsService;
let leagueOfLegendsProvider: LeagueOfLegendsProvider;

const logger = new Logger('reports', 'tests', 'tests', 'jest.tests', true);
const mocks = {
  getChampionsSuccess: GetChampionsSuccessMock as unknown as IResponse
};

describe('GetAdoptionService', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    leagueOfLegendsProvider = new LeagueOfLegendsProvider(axios);

    getAllChampionsService = new GetAllChampionsService(
      leagueOfLegendsProvider
    );

    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to get all champions', async () => {
    const leagueOfLegendsStub = sinon.stub(
      leagueOfLegendsProvider,
      'getChampions'
    ).resolves(mocks.getChampionsSuccess);

    const champions = await getAllChampionsService.execute(logger);
    expect(champions).resolves;
    expect(champions.data.Aatrox.version).toBe(mocks.getChampionsSuccess.data.Aatrox.version)

    sinon.assert.calledOnce(leagueOfLegendsStub);
  });
});