

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

            // if (mikrotikWithIdOne && mikrotikWithIdOne.chain === data[0].chain) {
            //     console.log('Değerler eşit.');
            // } else {
            //     console.log('Değerler eşit değil.');
            // }

            if (mikrotikWithIdOne) {
                if (mikrotikWithIdOne.chain === data[0].chain) {
                    console.log('chain değerleri eşit.');
                } else {
                    console.log('chain değerleri eşit değil.');
                }

                if (mikrotikWithIdOne.action === data[0].action) {
                    console.log('action değerleri eşit.');
                } else {
                    console.log('action değerleri eşit değil.');
                }

                if (mikrotikWithIdOne.bytes === data[0].bytes) {
                    console.log('bytes değerleri eşit.');
                } else {
                    console.log('bytes değerleri eşit değil.');
                }

                if (mikrotikWithIdOne.packets === data[0].packets) {
                    console.log('packets değerleri eşit.');
                } else {
                    console.log('packets değerleri eşit değil.');
                }

                if (mikrotikWithIdOne.dynamic === data[0].dynamic) {
                    console.log('dynamic değerleri eşit.');
                } else {
                    console.log('dynamic değerleri eşit değil.');
                }

                if (mikrotikWithIdOne.comment === data[0].comment) {
                    console.log('comment değerleri eşit.');
                } else {
                    console.log('comment değerleri eşit değil.');
                }
            } else {
                console.log('Mikrotik verisi bulunamadı.');
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
