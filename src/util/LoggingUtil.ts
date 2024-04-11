import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";

import { inject, injectable } from "tsyringe";

@injectable()
export class LoggingUtil
{

    constructor(
        @inject("WinstonLogger") private logger: ILogger) 
    {
    }

    public green(message: string) : void
    {
        this.logger.log(`PoorPlannersEscape: ${message}`, LogTextColor.GREEN);
    }

    public error(message: string) : void
    {
        this.logger.error(`PoorPlannersEscape: ${message}`);
    }

}