import { WhipSource } from "./domain/whip.js";
import { SessionRepository } from "./infrastructure/sessionRepository.js";
import { WhepUsecase } from "./usecase/whep.js";
import { WhipUsecase } from "./usecase/whip.js";

export const sessionRepository = new SessionRepository();
export const whipSource = new WhipSource();

export async function setup() {}

export const whepUsecase = new WhepUsecase();
export const whipUsecase = new WhipUsecase();
