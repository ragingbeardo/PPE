import type { VFS } from "@spt-aki/utils/VFS";

import { jsonc } from "jsonc";
import type { LoggingUtil } from "./LoggingUtil";
import { ModConfig } from "../model/ModConfig";
import { container, inject, injectable } from "tsyringe";

import path from "path";

@injectable()
export class ConfigUtil
{
    constructor(
        @inject("LoggingUtil") private loggingUtil: LoggingUtil
    )
    {}

    public parseModConfig(): ModConfig
    {
        const vfs = container.resolve<VFS>("VFS");

        // attempt to parse the config file
        let modConfig: ModConfig;
        try 
        {
            modConfig = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../../config/config.jsonc")));
        } 
        catch (error) 
        {
            this.loggingUtil.error("PoorPlannersEscape: There was an issue parsing the config. The mod will default to being enabled.");
            return new ModConfig(false);
        }

        return modConfig;
    }
}