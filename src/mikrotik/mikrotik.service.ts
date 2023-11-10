

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

        try {
            const conn = await routeros.connect();
            const data = await conn.write(["/ip/firewall/filter/print"]);

            const value = await this.mikrotikRepository.find();

            const mikrotikWithIdOne = value.find(mikrotik => mikrotik.id === 1);
            console.log(mikrotikWithIdOne);

            if (mikrotikWithIdOne && mikrotikWithIdOne.chain === data[0].chain) {
                console.log('Değerler eşit.');
            } else {
                console.log('Değerler eşit değil.');
            }

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            routeros.destroy();
        }
    }
}
