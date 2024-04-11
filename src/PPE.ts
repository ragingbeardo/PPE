import { PlayerRaidEndState } from "@spt-aki/models/enums/PlayerRaidEndState";
import { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";

export class PPE
{

    public runnerIfLeaving(info: ISaveProgressRequestData) : void
    {
        if (info.exit === PlayerRaidEndState.LEFT && !info.isPlayerScav)
        {
            info.exit = PlayerRaidEndState.RUNNER;
        }
    }

}