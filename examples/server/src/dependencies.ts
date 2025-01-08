import { SessionRepository } from "./infrastructure/sessionRepository.js";
import { WhepUsecase } from "./usecase/whep.js";
import { WhipUsecase } from "./usecase/whip.js";

export const sessionRepository = new SessionRepository();

export const whepUsecase = new WhepUsecase(sessionRepository);
export const whipUsecase = new WhipUsecase(sessionRepository);

export async function setup() {}
