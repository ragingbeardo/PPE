import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { InraidController } from "@spt-aki/controllers/InRaidController";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";

import { type DependencyContainer, Lifecycle } from "tsyringe";
import { PPE } from "./PPE";
import { ConfigUtil } from "./util/ConfigUtil";
import { LoggingUtil } from "./util/LoggingUtil";
import type { ModConfig } from "./model/ModConfig";

class Mod implements IPreAkiLoadMod
{

    private modConfig: ModConfig;

    public preAkiLoad(container: DependencyContainer): void 
    {
        //get base logger for the mod disable log output
        const defaultLogger = container.resolve<ILogger>("WinstonLogger");

        container.register<PPE>("PPE", PPE, {lifecycle: Lifecycle.Singleton});
        container.register<ConfigUtil>("PPEConfigUtil", ConfigUtil, {lifecycle: Lifecycle.Singleton});
        container.register<LoggingUtil>("PPELoggingUtil", LoggingUtil, {lifecycle: Lifecycle.Singleton});

        //parse the config and store the values
        this.modConfig = container.resolve<ConfigUtil>("PPEConfigUtil").parseModConfig();
        if ( this.modConfig.shutErDown ) defaultLogger.log("PoorPlannersEscape: The mod is disabled", LogTextColor.RED);

        const inraidController = container.resolve<InraidController>("InraidController");
        container.afterResolution("InraidController", (_t, result: InraidController) => 
        {
            result.savePostRaidProgress = (info, sessionID) => 
            {
                if ( !this.modConfig.shutErDown )
                {
                    container.resolve<PPE>("PPE").runnerIfLeaving(info);
                }
                
                return inraidController.savePostRaidProgress(info, sessionID);
            }
        }, {frequency: "Always"});
    }

}

module.exports = { mod: new Mod() }