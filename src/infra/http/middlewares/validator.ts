import { TypeEnum } from '@providers/LeagueOfLegendsProvider/types';
import { Segments, celebrate, Joi } from 'celebrate';

export const createChampionValidator = celebrate({
  [Segments.BODY]: Joi.object().required().keys({
    type: Joi.alternatives()
      .try(Joi.string().valid(...Object.values(TypeEnum)), Joi.allow(null))
      .optional(),
    // type: Joi.string().valid(...Object.values(TypeEnum)).allow(null).optional(),
  }),
  // [Segments.HEADERS]: authenticationHeadersJoi,
}, { abortEarly: false, allowUnknown: true });