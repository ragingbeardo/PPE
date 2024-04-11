import { DependencyContainer, Lifecycle } from "tsyringe";

import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { InraidController } from "@spt-aki/controllers/InRaidController";
import { PPE } from "./PPE";

class Mod implements IPreAkiLoadMod
{

    public preAkiLoad(container: DependencyContainer): void 
    {
        container.register<PPE>("PPE", PPE, {lifecycle: Lifecycle.Singleton});

        const inraidController = container.resolve<InraidController>("InraidController");

        container.afterResolution("InraidController", (_t, result: InraidController) => 
        {
            result.savePostRaidProgress = (info, sessionID) => 
            {
                container.resolve<PPE>("PPE").runnerIfLeaving(info);
                
                return inraidController.savePostRaidProgress(info, sessionID);
            }
        }, {frequency: "Always"});
    }

}

module.exports = { mod: new Mod() }