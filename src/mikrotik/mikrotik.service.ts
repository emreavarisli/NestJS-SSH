import { Injectable } from '@nestjs/common';
const { Routeros } = require("routeros-node");
import { Mikrotik } from './mikrotik.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MikrotikService {
    constructor(
        @InjectRepository(Mikrotik)
        private readonly mikrotikRepository: Repository<Mikrotik>
    ) { }
    async getFilterRules() {
        const routeros = new Routeros({
            host: "192.168.88.1",
            user: 'admin',
            password: '0853',
            port: 8728,
        });

        const data = await routeros
            .connect()
            .then((conn) => conn.write(["/ip/firewall/filter/print"]))
            .catch((error) => {
                console.log(error);

                return error;
            })
            .finally(() => {
                routeros.destroy();
            });

        const value = await this.mikrotikRepository.find();

        return data[0];
    }
}