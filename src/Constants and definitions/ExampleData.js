import {roles,job_categories,id_types,offer_status} from './Enums';

export let exampleUser = {
        id: 2137,
        creationDate: '01.01.2001',
        role: roles.employee,
        hash: 'SOM3V3RYS3CUR3H4SH',
        internal: true,
        email: 'someone@example.com',
        first_name: 'Krzysztof',
        last_name: 'Kononowicz',
        job_type: job_categories.government,
        income_level: 32000,
        id_type: id_types.PESEL,
        id_number: '45728493717'
};

export let exampleInquiries = [
        {
                id: 1001,
                creationDate: '2012-04-23T18:25:43.511Z',
                userId: 2137,
                ammount: 20000,
                installments: 24
        },
        {
                id: 1002,
                creationDate: '2012-05-20T18:25:43.511Z',
                userId: 2137,
                ammount: 30000,
                installments: 18
        },
        {
                id: 1003,
                creationDate: '2012-04-21T18:25:43.511Z',
                userId: 2137,
                ammount: 25000,
                installments: 40
        },
        {
                id: 1004,
                creationDate: '2012-07-23T18:25:43.511Z',
                userId: 2137,
                ammount: 30000,
                installments: 18
        },
        {
                id: 1005,
                creationDate: '2012-01-11T18:25:43.511Z',
                userId: 2137,
                ammount: 30000,
                installments: 18
        },
];

export let exampleOffers = [
        {
                id: 2003,
                creationDate: '2023-01-02T18:25:43.511Z',
                userId: 2137,
                bankId: 1001,
                platform_id: 1001,
                ammount: 20000,
                installments: 36,
                offerStatus:  offer_status.accepted,
                generatedContract: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signedContract: "https://en.wikipedia.org/wiki/Suinae"
        },
        {
                id: 2004,
                creationDate: '2023-01-04T18:25:43.511Z',
                userId: 2137,
                bankId: 2001,
                platformId: 2001,
                ammount: 30000,
                installments: 18,
                offerStatus:  offer_status.offered,
                generatedContract: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signedContract: ""
        },
        {
                id: 2005,
                creationDate: '2022-11-21T18:25:43.511Z',
                userId: 2137,
                bankId: 3001,
                platformId: 3001,
                ammount: 17000,
                installments: 12,
                offerStatus:  offer_status.waiting_for_acceptance,
                generatedContract: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signedContract: "https://en.wikipedia.org/wiki/Suinae"
        }
]