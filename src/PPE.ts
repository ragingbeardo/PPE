import { PlayerRaidEndState } from "@spt-aki/models/enums/PlayerRaidEndState";
import type { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";

import { inject, injectable } from "tsyringe";
import type { LoggingUtil } from "./util/LoggingUtil";

@injectable()
export class PPE
{

    constructor(
        @inject("PPELoggingUtil") private loggingUtil: LoggingUtil
    ) 
    {
    }

    public runnerIfLeaving(info: ISaveProgressRequestData) : void
    {
        if (info.exit === PlayerRaidEndState.LEFT && !info.isPlayerScav)
        {
            info.exit = PlayerRaidEndState.RUNNER;
            this.loggingUtil.green("You're a runner, you're a trackstar. Now you can go punish that toilet.");
        }
    }

}