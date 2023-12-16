

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


            const mikrotikIndex = value.findIndex(mikrotik => mikrotik.id === 1);

            if (mikrotikIndex !== -1) {
                const mikrotikWithIdOne = value[mikrotikIndex];
                const fieldsToCheck = ['chain', 'action', 'bytes', 'packets', 'dynamic', 'comment'];
                fieldsToCheck.forEach(field => {
                    if (mikrotikWithIdOne[field] !== data[mikrotikIndex][field]) {

                        if (mikrotikWithIdOne[field] !== Boolean(data[mikrotikIndex][field])) {

                            console.log(`${field} değerleri eşit değil.${mikrotikWithIdOne[field]}`);
                            console.log(`${field} değerleri eşit değil.${data[mikrotikIndex][field]}`);
                            mikrotikWithIdOne[field] = data[mikrotikIndex][field];
                            data[mikrotikIndex].ischanged = 1;


                        }

                    } else {
                        console.log(`${field} değerleri eşit.`);
                    }
                });

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
