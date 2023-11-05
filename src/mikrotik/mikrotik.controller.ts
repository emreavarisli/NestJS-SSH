import { Controller, Get } from '@nestjs/common';
import { MikrotikService } from './mikrotik.service';

@Controller('mikrotik')
export class MikrotikController {
    constructor(
        private readonly mikrotikService: MikrotikService
    ) { }


    @Get('execute')
    async executeCommand() {
        const commandOutput = await this.mikrotikService.getFilterRules();
        return commandOutput;
    }

}


